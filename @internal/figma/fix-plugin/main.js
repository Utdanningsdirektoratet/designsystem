/* global figma, __html__, PLAN */
/**
 * One-off development plugin that fixes the variables and bindings in sections 5 and 6 of
 * `notes/2026-10-designer-review.md` in Udir's library. `build.ts` prepends `PLAN`, the contents
 * of `plan.json` (made by `fix-plan.ts`).
 *
 * "Preview" only reads and reports what "Apply" would change. "Apply" makes the changes and
 * reports them. Bindings are fixed in two passes over the whole file: first on layers outside
 * instances, then on layers inside instances. After the first pass, a layer inside an instance
 * only still has a deleted binding when it is its own override, so fixing a main component
 * doesn't add overrides to its instances, wherever they are. A preview can't tell inherited
 * bindings from overrides, so it lists layers inside instances separately; Apply's report has
 * the final numbers.
 */

figma.showUI(__html__, { width: 440, height: 520, themeColors: true });

figma.ui.onmessage = async (message) => {
  if (message?.type !== 'preview' && message?.type !== 'apply') return;
  const apply = message.type === 'apply';
  try {
    const report = await run(apply);
    if (apply) figma.commitUndo();
    figma.ui.postMessage({ type: 'done', apply, report });
  } catch (error) {
    figma.ui.postMessage({ type: 'error', message: errorMessage(error) });
  }
};

/** Deleted variables that are unbound, keeping the value they have now. */
const UNBIND = new Set(['Semantic/border-width/highlight']);

const FIELD_LABEL_WEIGHT = {
  from: 'Theme/font-weight/medium',
  to: 'Theme/font-weight/semibold',
};

const TEXT_FIELDS = new Set([
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'paragraphSpacing',
  'paragraphIndent',
]);

async function run(apply) {
  const variables = await loadVariables();
  const report = { changes: [], unhandled: [] };
  await fixVariables(variables, apply, report);

  const context = { variables, apply, report, fonts: new Set() };
  const pages = [];
  for (const [index, page] of figma.root.children.entries()) {
    progress(`Loading page ${index + 1} of ${figma.root.children.length}`);
    await page.loadAsync();
    pages.push({ page, nodes: page.findAll(() => true) });
  }
  for (const [pass, inside] of [false, true].entries()) {
    context.insideInstances = inside;
    for (const [index, { page, nodes }] of pages.entries()) {
      progress(
        `Pass ${pass + 1} of 2, page ${index + 1} of ${pages.length}: ${page.name}`,
      );
      for (const node of nodes) {
        if (insideInstance(node) === inside) await fixNode(node, page, context);
      }
    }
  }
  return report;
}

// ---------------------------------------------------------------------------------------------
// Variables

async function loadVariables() {
  const byLabel = new Map();
  /** Alias id → `{ label, deleted }`. */
  const byId = new Map();
  for (const collection of await figma.variables.getLocalVariableCollectionsAsync()) {
    for (const id of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(id);
      if (variable)
        byLabel.set(`${collection.name}/${variable.name}`, variable);
    }
  }
  return {
    byLabel,
    async describe(id) {
      if (!byId.has(id)) byId.set(id, await describeVariable(id));
      return byId.get(id);
    },
  };
}

async function describeVariable(id) {
  const variable = await figma.variables.getVariableByIdAsync(id);
  if (!variable) return { label: `<missing ${id}>`, deleted: false };
  const collection = await figma.variables.getVariableCollectionByIdAsync(
    variable.variableCollectionId,
  );
  if (!collection) return { label: variable.name, deleted: false };
  return {
    label: `${collection.name}/${variable.name}`,
    // Remote collections may only list the variables imported into this file.
    deleted: !variable.remote && !collection.variableIds.includes(variable.id),
  };
}

async function fixVariables(variables, apply, report) {
  for (const fix of PLAN.variables) {
    const variable = variables.byLabel.get(fix.label);
    if (!variable) {
      report.unhandled.push({
        where: fix.label,
        problem: 'variable in the plan not found',
      });
      continue;
    }
    if (
      fix.codeSyntax !== undefined &&
      variable.codeSyntax.WEB !== fix.codeSyntax
    ) {
      report.changes.push({
        kind: 'code syntax',
        where: fix.label,
        from: variable.codeSyntax.WEB ?? '(none)',
        to: fix.codeSyntax,
      });
      if (apply) variable.setVariableCodeSyntax('WEB', fix.codeSyntax);
    }
    if (fix.scopes !== undefined && !sameItems(variable.scopes, fix.scopes)) {
      report.changes.push({
        kind: 'scopes',
        where: fix.label,
        from: sorted(variable.scopes).join(', ') || '(hidden)',
        // No scopes hide the variable from every variable picker.
        to: sorted(fix.scopes).join(', ') || '(hidden)',
      });
      if (apply) variable.scopes = [...fix.scopes];
    }
  }
}

// ---------------------------------------------------------------------------------------------
// Bindings

async function fixNode(node, page, context) {
  const bound = node.boundVariables;
  if (!bound) return;
  for (const [field, value] of Object.entries(bound)) {
    if (field === 'fills' || field === 'strokes') {
      await fixPaints(node, page, field, context);
    } else if (node.type === 'TEXT' && TEXT_FIELDS.has(field)) {
      await fixTextField(node, page, field, context);
    } else if (Array.isArray(value)) {
      for (const alias of value) {
        const info = await context.variables.describe(alias.id);
        if (info.deleted) {
          context.report.unhandled.push({
            where: where(page, node, field),
            problem: `bound to the deleted ${info.label}; this kind of field isn't handled`,
          });
        }
      }
    } else if (value?.id) {
      await fixField(node, page, field, value, context);
    }
  }
}

async function fixField(node, page, field, alias, context) {
  const info = await context.variables.describe(alias.id);
  if (!info.deleted) return;
  const replacement = replacementFor(info.label, node, context);
  if (!replacement) {
    unhandled(context, page, node, field, info.label);
    return;
  }
  if (replacement.unbind) {
    const value = node[field];
    record(
      context,
      'unbound',
      page,
      node,
      field,
      info.label,
      `fixed value ${value}`,
    );
    if (context.apply) {
      node.setBoundVariable(field, null);
      if (node[field] !== value) node[field] = value;
    }
    return;
  }
  record(context, 'rebound', page, node, field, info.label, replacement.label);
  if (context.apply) node.setBoundVariable(field, replacement.variable);
}

async function fixPaints(node, page, field, context) {
  const paints = node[field];
  if (!Array.isArray(paints)) return;
  let changed = false;
  const fixed = [];
  for (const paint of paints) {
    const alias = paint.boundVariables?.color;
    const info = alias && (await context.variables.describe(alias.id));
    if (!info?.deleted) {
      fixed.push(paint);
      continue;
    }
    const replacement = replacementFor(info.label, node, context);
    if (!replacement || replacement.unbind) {
      unhandled(context, page, node, field, info.label);
      fixed.push(paint);
      continue;
    }
    record(
      context,
      'rebound',
      page,
      node,
      field,
      info.label,
      replacement.label,
    );
    fixed.push(
      figma.variables.setBoundVariableForPaint(
        paint,
        'color',
        replacement.variable,
      ),
    );
    changed = true;
  }
  if (changed && context.apply) node[field] = fixed;
}

async function fixTextField(node, page, field, context) {
  for (const segment of node.getStyledTextSegments([
    'boundVariables',
    'fontName',
  ])) {
    const alias = segment.boundVariables?.[field];
    if (!alias) continue;
    const info = await context.variables.describe(alias.id);
    if (!info.deleted) continue;
    const replacement = replacementFor(info.label, node, context);
    const range = `${field}[${segment.start}–${segment.end}]`;
    if (!replacement || replacement.unbind) {
      unhandled(context, page, node, range, info.label);
      continue;
    }
    record(
      context,
      'rebound',
      page,
      node,
      range,
      info.label,
      replacement.label,
    );
    if (context.apply) {
      // Changing a text property needs the fonts of the family loaded, including the style the
      // new binding may select.
      await loadFamily(segment.fontName.family, context);
      node.setRangeBoundVariable(
        segment.start,
        segment.end,
        field,
        replacement.variable,
      );
    }
  }
}

/** The replacement for a deleted variable, `{ unbind: true }`, or undefined if there is none. */
function replacementFor(label, node, context) {
  if (UNBIND.has(label)) return { unbind: true };
  let target = label;
  const spacing = /^Semantic\/spacing\/(\d+)$/.exec(label);
  if (spacing) target = `Semantic/size/${spacing[1]}`;
  if (label === FIELD_LABEL_WEIGHT.from && isFieldLabel(node)) {
    target = FIELD_LABEL_WEIGHT.to;
  }
  // Otherwise the current variable with the same name, if there is one.
  const variable = context.variables.byLabel.get(target);
  return variable ? { label: target, variable } : undefined;
}

/** The label or legend text of a form field, as in Digdir's `label and description` frames. */
function isFieldLabel(node) {
  if (node.type !== 'TEXT' || !/^(label|legend\/label)$/.test(node.name)) {
    return false;
  }
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (/^label(\/legend)? and description$/.test(parent.name)) return true;
  }
  return false;
}

async function loadFamily(family, context) {
  if (context.fonts.has(family)) return;
  context.fonts.add(family);
  const fonts = await figma.listAvailableFontsAsync();
  for (const font of fonts) {
    if (font.fontName.family === family)
      await figma.loadFontAsync(font.fontName);
  }
}

// ---------------------------------------------------------------------------------------------
// Helpers

function insideInstance(node) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (parent.type === 'INSTANCE') return true;
  }
  return false;
}

function where(page, node, field) {
  const names = [];
  for (
    let current = node;
    current && current.type !== 'PAGE';
    current = current.parent
  ) {
    names.unshift(current.name);
  }
  return `${page.name.trim()} › ${names.join(' > ')} :: ${field}`;
}

function record(context, kind, page, node, field, from, to) {
  context.report.changes.push({
    // In a preview, the main component isn't fixed yet, so these may turn out to be inherited.
    kind:
      context.insideInstances && !context.apply
        ? `${kind} inside an instance, unless inherited`
        : kind,
    where: where(page, node, field),
    from,
    to,
  });
}

function unhandled(context, page, node, field, label) {
  context.report.unhandled.push({
    where: where(page, node, field),
    problem: `bound to the deleted ${label}, which has no replacement`,
  });
}

function sameItems(a, b) {
  return sorted(a).join() === sorted(b).join();
}

function sorted(items) {
  return [...items].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function progress(text) {
  figma.ui.postMessage({ type: 'progress', text });
}

function errorMessage(error) {
  // Not `instanceof Error`: errors thrown by the Plugin API may come from another realm.
  return typeof error?.message === 'string' ? error.message : String(error);
}
