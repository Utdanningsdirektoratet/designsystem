/* global figma */
/**
 * Read-only snapshot extractor for a Figma component library.
 *
 * Run it through the Figma MCP server's `use_figma` tool: send this file's full contents followed
 * by one line that calls `extractSnapshot`, for example
 *
 *   return await extractSnapshot({ part: 'variables', collections: ['Size'] });
 *
 * See `@internal/figma/README.md` for the parts, the workflow and how the result is saved and compared.
 *
 * The script only reads. It never sets a property or creates, changes or removes nodes, variables
 * or styles. The only state it touches is the plugin's current page, which `use_figma` resets at
 * the start of every call.
 */

// Bump whenever the extracted facts change, so `compare-snapshots.ts` refuses to compare
// snapshots made by different versions of this script. Keep it identical there.
const SNAPSHOT_SCHEMA = 4;

/**
 * Entry point, called by the line appended when the script is sent to `use_figma`.
 *
 * @param {{
 *   part: 'pages' | 'index' | 'variables' | 'components',
 *   page?: string,
 *   pageIndex?: number,
 *   components?: string[],
 *   collections?: string[],
 * }} options
 */
// oxlint-disable-next-line no-unused-vars
async function extractSnapshot(options) {
  let data;
  switch (options.part) {
    case 'pages':
      data = figma.root.children.map((page) => page.name);
      break;
    case 'index':
      data = await indexPage(options.page, options.pageIndex);
      break;
    case 'variables':
      data = await extractVariables(options.collections ?? []);
      break;
    case 'components':
      data = await extractComponents(
        options.page,
        options.pageIndex,
        options.components ?? [],
      );
      break;
    default:
      throw new Error(
        `Unknown part "${String(options.part)}". Use pages, index, variables or components.`,
      );
  }
  return {
    schema: SNAPSHOT_SCHEMA,
    file: figma.root.name,
    part: options.part,
    options,
    size: stableStringify(data).length,
    data,
    checksum: checksum(data),
  };
}

// ---------------------------------------------------------------------------------------------
// Parts

/**
 * Opens a page by name, or by position when `index` is given. Pages can share a name (separator
 * pages are often all called `---`), so the plugin passes the position as well; the name must
 * still match, so a reordered file fails instead of extracting the wrong page.
 */
async function openPage(name, index) {
  const pages = figma.root.children;
  const page =
    index === undefined
      ? pages.find((candidate) => candidate.name === name)
      : pages[index];
  if (!page || page.name !== name) {
    const names = pages.map((candidate) => candidate.name);
    throw new Error(
      `No page named "${name}"${index === undefined ? '' : ` at position ${index}`}. Pages: ${names.join(' | ')}`,
    );
  }
  await figma.setCurrentPageAsync(page);
  return page;
}

/** Component sets and standalone components on a page (not the variants inside sets). */
function findComponents(page) {
  return page
    .findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })
    .filter(
      (node) =>
        node.type === 'COMPONENT_SET' || node.parent?.type !== 'COMPONENT_SET',
    );
}

async function indexPage(pageName, pageIndex) {
  const page = await openPage(pageName, pageIndex);
  return findComponents(page)
    .map((node) => ({
      name: node.name,
      type: node.type,
      variants:
        node.type === 'COMPONENT_SET' ? node.children.length : undefined,
    }))
    .sort(byName);
}

async function extractVariables(collectionNames) {
  const all = await figma.variables.getLocalVariableCollectionsAsync();
  const selected =
    collectionNames.length === 0
      ? all
      : collectionNames.map((name) => {
          const collection = all.find((candidate) => candidate.name === name);
          if (!collection) {
            const names = all.map((candidate) => candidate.name);
            throw new Error(
              `No variable collection named "${name}". Collections: ${names.join(' | ')}`,
            );
          }
          return collection;
        });

  const result = [];
  for (const collection of selected) {
    const variables = [];
    for (const id of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(id);
      if (!variable) continue;
      const values = {};
      for (const mode of collection.modes) {
        values[mode.name] = await variableValue(
          variable.valuesByMode[mode.modeId],
        );
      }
      variables.push({
        name: variable.name,
        type: variable.resolvedType,
        scopes: [...variable.scopes].sort(compareText),
        codeSyntax: nonEmpty(variable.codeSyntax),
        hiddenFromPublishing: variable.hiddenFromPublishing || undefined,
        values,
      });
    }
    result.push({
      name: collection.name,
      modes: collection.modes.map((mode) => mode.name),
      defaultMode: collection.modes.find(
        (mode) => mode.modeId === collection.defaultModeId,
      )?.name,
      hiddenFromPublishing: collection.hiddenFromPublishing || undefined,
      variables: variables.sort(byName),
    });
  }
  return result.sort(byName);
}

async function extractComponents(pageName, pageIndex, componentNames) {
  const page = await openPage(pageName, pageIndex);
  const all = findComponents(page);
  let selected = all;
  if (componentNames.length > 0) {
    const missing = componentNames.filter(
      (name) => !all.some((node) => node.name === name),
    );
    if (missing.length > 0) {
      throw new Error(
        `Not found on page "${pageName}": ${missing.join(' | ')}. Run the index part to list the names.`,
      );
    }
    selected = all.filter((node) => componentNames.includes(node.name));
  }

  const result = [];
  for (const node of selected) {
    const entry = {
      name: node.name,
      type: node.type,
      // Tells apart same-named components on one page, such as two `_Header`s in different frames.
      container: containerPath(node) || undefined,
      properties: await propertyDefinitions(node),
    };
    if (node.type === 'COMPONENT_SET') {
      entry.variants = [];
      for (const variant of node.children) {
        entry.variants.push({
          name: canonicalVariantName(variant.name),
          tree: await nodeTree(variant),
        });
      }
      entry.variants.sort(byName);
    } else {
      entry.tree = await nodeTree(node);
    }
    result.push(entry);
  }
  return result.sort(byName);
}

// ---------------------------------------------------------------------------------------------
// Nodes

const LAYOUT_FIELDS = [
  'layoutMode',
  'layoutWrap',
  'primaryAxisSizingMode',
  'counterAxisSizingMode',
  'primaryAxisAlignItems',
  'counterAxisAlignItems',
  'layoutSizingHorizontal',
  'layoutSizingVertical',
  'layoutPositioning',
  'layoutGrow',
  'itemSpacing',
  'counterAxisSpacing',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'clipsContent',
  'strokesIncludedInLayout',
];

const SHAPE_FIELDS = [
  'visible',
  'opacity',
  'cornerRadius',
  'topLeftRadius',
  'topRightRadius',
  'bottomLeftRadius',
  'bottomRightRadius',
  'strokeWeight',
  'strokeTopWeight',
  'strokeRightWeight',
  'strokeBottomWeight',
  'strokeLeftWeight',
  'strokeAlign',
];

const TEXT_FIELDS = [
  'characters',
  'fontName',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
  'textCase',
  'textDecoration',
  'textAlignHorizontal',
  'textAlignVertical',
  'textAutoResize',
  'paragraphSpacing',
];

const STYLE_FIELDS = {
  fillStyleId: 'fillStyle',
  strokeStyleId: 'strokeStyle',
  effectStyleId: 'effectStyle',
  textStyleId: 'textStyle',
};

/** A node and its descendants. Instances are not expanded; their overrides are recorded instead. */
async function nodeTree(node) {
  const facts = await nodeFacts(node, { alwaysSize: false });
  if (node.type === 'INSTANCE') {
    Object.assign(facts, await instanceFacts(node));
  } else if ('children' in node && node.children.length > 0) {
    facts.children = [];
    for (const child of node.children) {
      facts.children.push(await nodeTree(child));
    }
  }
  return facts;
}

async function nodeFacts(node, { alwaysSize }) {
  const facts = { name: node.name, type: node.type };
  const fields = [...LAYOUT_FIELDS, ...SHAPE_FIELDS];
  if (node.type === 'TEXT') fields.push(...TEXT_FIELDS);
  for (const field of fields) {
    const value = read(node, field);
    if (value !== undefined) facts[field] = value;
  }

  // Width and height are only meaningful when fixed; hug and fill sizes depend on content.
  const horizontal = read(node, 'layoutSizingHorizontal');
  const vertical = read(node, 'layoutSizingVertical');
  if (alwaysSize || horizontal === undefined || horizontal === 'FIXED') {
    facts.width = read(node, 'width');
  }
  if (alwaysSize || vertical === undefined || vertical === 'FIXED') {
    facts.height = read(node, 'height');
  }

  if (typeof facts.characters === 'string' && facts.characters.length > 200) {
    facts.characters = `${facts.characters.slice(0, 200)}…`;
  }

  for (const paintField of ['fills', 'strokes']) {
    if (paintField in node) {
      const paints = await paintList(node[paintField]);
      if (paints !== undefined) facts[paintField] = paints;
    }
  }
  if ('effects' in node && node.effects.length > 0) {
    facts.effects = node.effects.map((effect) =>
      normalize({
        type: effect.type,
        visible: effect.visible === false ? false : undefined,
        radius: effect.radius,
        spread: effect.spread,
        offset: effect.offset,
        color: effect.color ? hex(effect.color) : undefined,
      }),
    );
  }

  for (const [idField, name] of Object.entries(STYLE_FIELDS)) {
    if (idField in node) {
      const style = await styleName(node[idField]);
      if (style !== undefined) facts[name] = style;
    }
  }

  const bound = await boundVariables(node);
  if (bound !== undefined) facts.boundVariables = bound;
  const modes = await variableModes(node);
  if (modes !== undefined) facts.variableModes = modes;
  return facts;
}

async function instanceFacts(instance) {
  const facts = await instanceReference(instance);

  const overrides = {};
  let unreadable = 0;
  for (const override of instance.overrides) {
    const target = await figma.getNodeByIdAsync(override.id);
    if (!target) {
      // Seen through `use_figma`, where some nested layers could not be looked up while the
      // plugin could read them. Count them, so a comparison shows the gap instead of hiding it.
      unreadable++;
      continue;
    }
    const targetFacts = await nodeFacts(target, { alwaysSize: true });
    if (target.type === 'INSTANCE' && target.id !== instance.id) {
      // A nested instance's property values and main component (after a swap) can be
      // overridden too, and aren't part of `nodeFacts`.
      Object.assign(targetFacts, await instanceReference(target));
    }
    const fields = [...override.overriddenFields].sort(compareText);
    const values = {};
    for (const field of fields) {
      const key = STYLE_FIELDS[field] ?? field;
      if (targetFacts[key] !== undefined) values[key] = targetFacts[key];
    }
    // Keep the target's bindings, explicit modes and, for nested instances, which component and
    // property values it uses, whichever fields are listed. A rebinding between two variables
    // with equal values, or a change to a nested instance's property, is then recorded however
    // Figma lists it.
    for (const key of [
      'boundVariables',
      'variableModes',
      'mainComponent',
      'mainComponentContainer',
      'componentProperties',
    ]) {
      if (targetFacts[key] !== undefined) values[key] = targetFacts[key];
    }
    overrides[relativePath(instance, target)] = { fields, values };
  }
  if (Object.keys(overrides).length > 0) facts.overrides = overrides;
  if (unreadable > 0) facts.unreadableOverrides = unreadable;
  return facts;
}

/**
 * The main component an instance uses and its component property values. The frames around the
 * main component are only compared when its name is ambiguous; see `compare-snapshots.ts`.
 */
async function instanceReference(instance) {
  const facts = {};
  const main = await instance.getMainComponentAsync();
  facts.mainComponent = main ? componentLabel(main) : '<missing>';
  if (main) {
    facts.mainComponentContainer =
      containerPath(componentOwner(main)) || undefined;
  }

  const properties = {};
  for (const key of Object.keys(instance.componentProperties).sort()) {
    const property = instance.componentProperties[key];
    properties[stripPropertyId(key)] =
      property.type === 'INSTANCE_SWAP'
        ? await componentLabelById(property.value)
        : normalize(property.value);
  }
  if (Object.keys(properties).length > 0) {
    facts.componentProperties = properties;
  }
  return facts;
}

/** The component set a variant belongs to, or the component itself. */
function componentOwner(component) {
  return component.parent?.type === 'COMPONENT_SET'
    ? component.parent
    : component;
}

/** Names of the frames, sections and groups between a node and its page. */
function containerPath(node) {
  const names = [];
  let parent = node.parent;
  while (parent && parent.type !== 'PAGE' && parent.type !== 'DOCUMENT') {
    names.unshift(parent.name);
    parent = parent.parent;
  }
  return names.join(' > ');
}

async function propertyDefinitions(node) {
  // Only component sets and standalone components own property definitions.
  const definitions = node.componentPropertyDefinitions;
  const result = {};
  for (const key of Object.keys(definitions).sort()) {
    const definition = definitions[key];
    result[stripPropertyId(key)] = {
      type: definition.type,
      default:
        definition.type === 'INSTANCE_SWAP'
          ? await componentLabelById(definition.defaultValue)
          : normalize(definition.defaultValue),
      options: definition.variantOptions,
    };
  }
  return result;
}

/** Layer path from `root` to `target`, numbering same-named siblings like `compare-snapshots.ts`. */
function relativePath(root, target) {
  const segments = [];
  let node = target;
  while (node && node.id !== root.id) {
    segments.unshift(pathSegment(node));
    node = node.parent;
  }
  return segments.length === 0 ? '.' : segments.join(' > ');
}

/** The node's name, with ` #n` for the nth sibling with that name (n > 1). */
function pathSegment(node) {
  const siblings =
    node.parent && 'children' in node.parent ? node.parent.children : [node];
  let occurrence = 0;
  for (const sibling of siblings) {
    if (sibling.name === node.name) occurrence++;
    if (sibling.id === node.id) break;
  }
  return occurrence > 1 ? `${node.name} #${occurrence}` : node.name;
}

function componentLabel(component) {
  const base =
    component.parent?.type === 'COMPONENT_SET'
      ? `${component.parent.name} [${canonicalVariantName(component.name)}]`
      : component.name;
  return component.remote ? `${base} (remote)` : base;
}

async function componentLabelById(id) {
  if (typeof id !== 'string') return normalize(id);
  const node = await figma.getNodeByIdAsync(id);
  return node && node.type === 'COMPONENT' ? componentLabel(node) : '<missing>';
}

/** Variant names list their properties in layer order; sort them so renamed order doesn't count as a change. */
function canonicalVariantName(name) {
  return name
    .split(',')
    .map((part) => part.trim())
    .sort(compareText)
    .join(', ');
}

/** Component property keys end in a file-specific id (`Label#123:4`), which differs between files. */
function stripPropertyId(key) {
  return key.replace(/#[^#]*$/, '');
}

// ---------------------------------------------------------------------------------------------
// Values

function read(node, field) {
  if (!(field in node)) return undefined;
  try {
    return normalize(node[field]);
  } catch {
    return undefined;
  }
}

function normalize(value) {
  if (value === figma.mixed) return 'mixed';
  if (typeof value === 'number') return Math.round(value * 100) / 100;
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value)) result[key] = normalize(value[key]);
    return result;
  }
  return value;
}

function nonEmpty(object) {
  return object && Object.keys(object).length > 0 ? object : undefined;
}

function hex(color) {
  const channel = (value) =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
  const alpha = color.a === undefined || color.a === 1 ? '' : channel(color.a);
  return `#${channel(color.r)}${channel(color.g)}${channel(color.b)}${alpha}`;
}

async function paintList(paints) {
  if (paints === figma.mixed) return 'mixed';
  if (!Array.isArray(paints)) return undefined;
  const result = [];
  for (const paint of paints) {
    result.push(
      normalize({
        type: paint.type,
        visible: paint.visible === false ? false : undefined,
        opacity: paint.opacity === 1 ? undefined : paint.opacity,
        color: paint.type === 'SOLID' ? hex(paint.color) : undefined,
        colorVariable: paint.boundVariables?.color
          ? await variableName(paint.boundVariables.color.id)
          : undefined,
        stops: paint.gradientStops?.map((stop) => ({
          position: stop.position,
          color: hex(stop.color),
        })),
      }),
    );
  }
  return result;
}

async function boundVariables(node) {
  const bound = node.boundVariables;
  if (!bound) return undefined;
  const result = {};
  for (const key of Object.keys(bound).sort()) {
    // Paint bindings are recorded on the paints themselves (`colorVariable`).
    if (key === 'fills' || key === 'strokes') continue;
    result[key] = await resolveAliases(bound[key]);
  }
  return nonEmpty(result);
}

async function resolveAliases(value) {
  if (Array.isArray(value)) {
    const result = [];
    for (const item of value) result.push(await resolveAliases(item));
    return result;
  }
  if (value && typeof value === 'object') {
    if (value.type === 'VARIABLE_ALIAS') return variableName(value.id);
    const result = {};
    for (const key of Object.keys(value).sort()) {
      result[stripPropertyId(key)] = await resolveAliases(value[key]);
    }
    return result;
  }
  return normalize(value);
}

async function variableValue(value) {
  if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
    return { alias: await variableName(value.id) };
  }
  if (value && typeof value === 'object' && 'r' in value) return hex(value);
  return normalize(value);
}

/**
 * Variable and collection labels by id. Valid for one snapshot only: in a plugin session the file
 * can change between exports, so `clearCaches` must be called before each one. (`use_figma` loads
 * the script afresh for every call.)
 */
const variableNames = new Map();
const collections = new Map();

// Called by `plugin/main.js`, which is concatenated after this file.
// oxlint-disable-next-line no-unused-vars
function clearCaches() {
  variableNames.clear();
  collections.clear();
}

async function variableCollection(id) {
  if (!collections.has(id)) {
    collections.set(
      id,
      await figma.variables.getVariableCollectionByIdAsync(id),
    );
  }
  return collections.get(id);
}

/**
 * The modes set explicitly on a node, as `{ collection name: mode name }`. Instances take these
 * with them, unlike modes inherited from the frames a main component sits in on its page, so
 * only explicit modes are recorded. Figma's team-default modes aren't included either.
 */
async function variableModes(node) {
  if (!('explicitVariableModes' in node)) return undefined;
  const result = {};
  for (const [collectionId, modeId] of Object.entries(
    node.explicitVariableModes,
  )) {
    const collection = await variableCollection(collectionId);
    if (!collection) {
      result['<missing>'] = modeId;
      continue;
    }
    const mode = collection.modes.find(
      (candidate) => candidate.modeId === modeId,
    );
    const name = collection.remote
      ? `${collection.name} (remote)`
      : collection.name;
    result[name] = mode ? mode.name : '<missing>';
  }
  return nonEmpty(result);
}

/**
 * `Collection/name`, with ` (remote)` for library variables, ` (deleted)` for local variables that
 * are no longer in their collection, and `<missing>` when the variable can't be found at all.
 */
async function variableName(id) {
  if (variableNames.has(id)) return variableNames.get(id);
  let label = '<missing>';
  const variable = await figma.variables.getVariableByIdAsync(id);
  if (variable) {
    const collection = await variableCollection(variable.variableCollectionId);
    label = `${collection ? collection.name : '<unknown collection>'}/${variable.name}`;
    if (variable.remote) {
      label += ' (remote)';
    } else if (!collection || !collection.variableIds.includes(id)) {
      // Figma still returns deleted local variables by id, and bindings to them keep their
      // value, so they look like ordinary bindings unless checked against the collection.
      // Remote collections aren't checked: they may only list the variables imported here.
      label += ' (deleted)';
    }
  }
  variableNames.set(id, label);
  return label;
}

async function styleName(id) {
  if (id === figma.mixed) return 'mixed';
  if (!id) return undefined;
  const style = await figma.getStyleByIdAsync(id);
  if (!style) return '<missing>';
  return style.remote ? `${style.name} (remote)` : style.name;
}

function compareText(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function byName(a, b) {
  return compareText(a.name, b.name);
}

// ---------------------------------------------------------------------------------------------
// Checksum. Keep identical to `compare-snapshots.ts`, which verifies saved snapshots with it.

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) {
    return `[${value.map((item) => (item === undefined ? 'null' : stableStringify(item))).join(',')}]`;
  }
  const keys = Object.keys(value)
    .filter((key) => value[key] !== undefined)
    .sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
}

function checksum(value) {
  const text = stableStringify(value);
  let first = 0x811c9dc5;
  let second = 0x050c5d1f;
  for (let index = 0; index < text.length; index++) {
    const code = text.charCodeAt(index);
    first = Math.imul(first ^ code, 0x01000193) >>> 0;
    second = Math.imul(second ^ code, 0x01000193) >>> 0;
  }
  return (
    first.toString(16).padStart(8, '0') + second.toString(16).padStart(8, '0')
  );
}
