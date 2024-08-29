import { loadFile, ASTNode } from 'magicast';
import generate from '@babel/generator';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import type { NodePath } from '@babel/traverse';
import { withCustomConfig, PropItem } from 'react-docgen-typescript';
import {
  GeneratorMeta,
  generatorSpecificFields,
  requiredMetaFields,
} from './types';
import { CartesianInput, cartesian } from './cartesian';
import { ComponentType } from 'react';
import camelCase from 'camelcase';

interface Logger {
  readonly log: typeof console.log;
  readonly debug: typeof console.debug;
}

let logger: Logger | undefined;

export async function generateDynamicCsf<T extends ComponentType>(
  tsconfigPath: string,
  fileName: string,
  meta: GeneratorMeta<T>,
  providedLogger?: Logger
) {
  logger = providedLogger;
  // Sanity check that the file exposes the required metadata properties
  if (!meta) {
    throw new Error('Missing default export of GeneratorMeta data');
  }
  requiredMetaFields.forEach((field) => {
    if (meta[field] === undefined) {
      throw new Error(
        `Missing property '${field}' from exported GeneratorMeta data`
      );
    }
  });
  if (!meta.component.displayName) {
    throw new Error('Missing displayName for component');
  }
  const absoluteComponentPath = new URL(
    meta.componentPath,
    `file://${fileName}`
  ).pathname;
  const docgenWithTsconfig = withCustomConfig(tsconfigPath, {
    shouldRemoveUndefinedFromOptional: true,
    shouldExtractLiteralValuesFromEnum: true,
  });
  const docgenResults = docgenWithTsconfig.parse(absoluteComponentPath);
  // Parse the component source file using react-docgen-typescript and find the docs for the corresponding component
  const docgenInfo = docgenResults.find(
    (x) => x.displayName === meta.component.displayName
  );
  if (!docgenInfo) {
    throw new Error(
      `
No matching component found by react-docgen-typescript. Is componentPath defined correctly?
  - Looking for component with displayName '${meta.component.displayName}'
    in file ${absoluteComponentPath}`.trim()
    );
  }

  logger?.log('=== STORY GENERATOR ===');
  logger?.log('Processing file', fileName);
  logger?.log('Component:', meta.component.displayName ?? '<anonymous>');
  const docgenVariantProps = Object.fromEntries(
    meta.variantProps.map((key) => [key, docgenInfo.props[key as string]])
  );
  logger?.debug();
  logger?.debug('--- Variant docgen props ---');
  logger?.debug(docgenVariantProps);

  const derivedStorySuffixes = Object.keys(
    meta.deriveStories?.(meta.baseStory) ?? {}
  );

  const codeAsData = await loadFile(fileName);
  codeAsData.imports.$add({
    from: '@storybook/react',
    imported: 'Meta',
  });
  const argCombinations = getArgCombinations(
    docgenVariantProps,
    meta.definedVariants
  );
  createValidCsf(codeAsData.$ast, argCombinations, derivedStorySuffixes);
  const code = generate(codeAsData.$ast).code;
  logger?.log();
  logger?.log('Code successfully generated');
  logger?.debug();
  logger?.debug('--- Code output ---');
  logger?.debug(code);
  return code;
}

type RefCounterState = {
  importedIdentifiers: string[];
  referencedIdentifiers: string[];
};
function findUnusedImports(node: t.Program) {
  const resultState: RefCounterState = {
    importedIdentifiers: [],
    referencedIdentifiers: [],
  };
  traverse<RefCounterState>(
    node,
    {
      ImportDeclaration(path, state) {
        path.node.specifiers.forEach((x) => {
          state.importedIdentifiers.push(x.local.name);
        });
      },
      Identifier(path, state) {
        if (path.findParent((x) => t.isImportDeclaration(x.node))) {
          return;
        }
        state.referencedIdentifiers.push(path.node.name);
      },
    },
    undefined,
    resultState
  );
  const imports = new Set(resultState.importedIdentifiers);
  const refs = new Set(resultState.referencedIdentifiers);
  refs.forEach((ref) => imports.delete(ref));
  return imports as ReadonlySet<string>;
}

function removeUnusedImports(node: t.Program) {
  const unused = findUnusedImports(node);
  traverse(node, {
    noScope: true,
    ImportDeclaration(path) {
      const newSpecifiers = path.node.specifiers.filter(
        (x) => !unused.has(x.local.name)
      );
      if (newSpecifiers.length === 0) {
        path.remove();
        return;
      }
      path.node.specifiers = newSpecifiers;
    },
  });
}

type GenerateStoriesState = {
  currentReference?: string;
};

function generateStories(
  program: t.Program,
  propCombinations: UnknownObject[],
  derivedStorySuffixes: string[],
  state: GenerateStoriesState = {}
) {
  function generateStoriesFromMetadataObject(obj: t.ObjectExpression) {
    const baseStory = obj.properties.find(findPropertyWithName('baseStory'));
    const deriveStories = obj.properties.find(
      findPropertyWithName('deriveStories')
    );
    if (!baseStory) {
      throw new Error('Missing "baseStory" property in default export object');
    }
    if (!t.isExpression(baseStory.value)) {
      throw new Error(
        `Expected baseStory to be a valid "Expression", but instead got ${baseStory.value.type}`
      );
    }
    const deriveStoriesFn =
      t.isExpression(deriveStories?.value) ||
      t.isV8IntrinsicIdentifier(deriveStories?.value)
        ? deriveStories.value
        : undefined;

    const stories = generateStoriesFromBaseStoryValue(
      baseStory.value,
      propCombinations,
      derivedStorySuffixes,
      deriveStoriesFn
    );

    program.body.push(...stories);
  }

  traverse(program, {
    ExportDefaultDeclaration(path) {
      if (state.currentReference) {
        return;
      }
      if (t.isIdentifier(path.node.declaration)) {
        // Default export references a variable. Recursing...
        generateStories(program, propCombinations, derivedStorySuffixes, {
          currentReference: path.node.declaration.name,
        });
      } else if (t.isObjectExpression(path.node.declaration)) {
        generateStoriesFromMetadataObject(path.node.declaration);
      }
    },
    VariableDeclarator(path) {
      if (
        state.currentReference &&
        t.isIdentifier(path.node.id, { name: state.currentReference })
      ) {
        if (t.isIdentifier(path.node.init)) {
          // Variable references another variable. Recursing...
          generateStories(program, propCombinations, derivedStorySuffixes, {
            currentReference: path.node.init.name,
          });
        } else if (t.isObjectExpression(path.node.init)) {
          generateStoriesFromMetadataObject(path.node.init);
        }
      }
    },
  });
}
const findPropertyWithName =
  (name: string) =>
  (x: t.ObjectExpression['properties'][number]): x is t.ObjectProperty =>
    t.isObjectProperty(x) && t.isIdentifier(x.key, { name });

const BASE_STORY_VAR = '__baseStory';
const VARIANT_PARAMS_OBJ = '__variants';

function makeExport(exportName: string, variantName: string) {
  return t.exportNamedDeclaration(
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(exportName),
        t.objectExpression([
          t.spreadElement(t.identifier(BASE_STORY_VAR)),
          t.objectProperty(
            t.identifier('args'),
            t.objectExpression([
              t.spreadElement(
                t.memberExpression(
                  t.identifier(BASE_STORY_VAR),
                  t.identifier('args')
                )
              ),
              t.spreadElement(
                t.memberExpression(
                  t.identifier(VARIANT_PARAMS_OBJ),
                  t.stringLiteral(variantName),
                  true
                )
              ),
            ])
          ),
        ])
      ),
    ])
    // export const TertiaryDangerLg = { ...__baseStory, args: { ..._baseStory.args, ..._variants['tertiary-danger-lg] } }
  );
}

function generateStoriesFromBaseStoryValue(
  base: t.Expression,
  argCombinations: UnknownObject[],
  derivedStorySuffixes: string[],
  deriveStories?: t.Expression | t.V8IntrinsicIdentifier
): t.Statement[] {
  const baseStoryIdentifier = t.identifier(BASE_STORY_VAR);
  const baseStoryDeclaration = t.variableDeclaration('const', [
    t.variableDeclarator(baseStoryIdentifier, base),
  ]);

  return [
    baseStoryDeclaration,
    ...argCombinations.flatMap((props) => {
      const variantName = getVariantName(props);
      const exportName = camelCase(variantName, { pascalCase: true });

      // TODO: Story type annotation =
      const storyExport = makeExport(exportName, variantName);
      t.addComment(
        storyExport,
        'leading',
        `
 * ${variantName}
 `
      );
      const result = [storyExport];
      if (!deriveStories) {
        return result;
      }

      // Create derived stories from the variant story
      const c = t.callExpression(deriveStories, [
        t.identifier(exportName),
      ] as t.CallExpression['arguments']);
      const derivedStoriesName = `${camelCase(exportName)}Variants`;
      const derivedStoriesId = t.identifier(derivedStoriesName);
      const derivedStoriesVar = t.variableDeclaration('const', [
        t.variableDeclarator(derivedStoriesId, c),
      ]);

      const derivedExports = derivedStorySuffixes.map((suffix) =>
        t.exportNamedDeclaration(
          t.variableDeclaration('const', [
            t.variableDeclarator(
              t.identifier(
                camelCase(`${variantName}-${suffix}`, { pascalCase: true })
              ),
              t.identifier(`${derivedStoriesName}['${suffix}']`)
            ),
          ])
        )
      );
      return [...result, derivedStoriesVar, ...derivedExports];
    }),
  ];
}

function createValidCsf(
  node: ASTNode,
  propCombinations: UnknownObject[],
  derivedStorySuffixes: string[]
) {
  t.addComment(
    node,
    'inner',
    `
/*----------------------------------------------------*
 * This file is automatically generated. DO NOT EDIT! *
 *----------------------------------------------------*/
`
      .trim()
      // remove comment start/end, since this will be added by addComment
      .replace(/(\/\*|\*\/)/g, '')
  );

  const combinations = Object.fromEntries(
    propCombinations.map((x) => [getVariantName(x), x])
  );

  const combinationsObj = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(VARIANT_PARAMS_OBJ),
      t.valueToNode(combinations)
    ),
  ]);
  t.addComment(
    combinationsObj,
    'leading',
    ' Generated combinations of the known parameter variations',
    true
  );

  if (!t.isProgram(node)) {
    throw new Error(
      `createValidCsf: invalid Node type. We expected a Program, but were given a ${node.type}`
    );
  }
  node.body.push(combinationsObj);

  traverse(node, {
    TSTypeReference(path) {
      const typeName = path.get('typeName');
      const typeParameters = path.node.typeParameters;
      if (typeName.isIdentifier({ name: 'GeneratorMeta' })) {
        // Change the type from GeneratorMeta to Meta
        if (typeParameters) {
          typeName.node.name = 'Meta';
          typeParameters.params = [typeParameters.params[0]];
        }
      }
    },
    ExportDefaultDeclaration(path) {
      const declaration = path.get('declaration');
      generateStories(node, propCombinations, derivedStorySuffixes);
      if (declaration.isIdentifier()) {
        const namedDefaultExportVar = declaration.node.name;
        stripGeneratorMetaFields(node, namedDefaultExportVar);
      } else {
        stripGeneratorMetaFields(node);
      }
    },
  });

  removeUnusedImports(node);
}

function isReferenceToMetaType(x: t.TSType): boolean {
  return t.isTSTypeReference(x) && t.isIdentifier(x.typeName, { name: 'Meta' });
}

function hasSomeReferenceToMetaType(x: NodePath<ASTNode>) {
  // If this is a variable declaration, we check if the identifier references the meta type
  if (x.isVariableDeclarator()) {
    if (t.isIdentifier(x.node.id)) {
      if (t.isTSTypeAnnotation(x.node.id.typeAnnotation)) {
        return isReferenceToMetaType(x.node.id.typeAnnotation.typeAnnotation);
      }
    }
  }
  // If this is an 'as' or 'satisfies' expression, we check if it references the meta type
  if (x.isTSAsExpression() || x.isTSSatisfiesExpression()) {
    return isReferenceToMetaType(x.node.typeAnnotation);
  }
  return false;
}

function stripGeneratorMetaFields(node: ASTNode, identifier?: string) {
  traverse(node, {
    ObjectExpression: (path) => {
      if (
        // We check the parent tree of the object expression
        path.findParent((x) => {
          return (
            // Check if the expression's parent references the Meta type
            hasSomeReferenceToMetaType(x) ||
            // (to handle non-typescript scenarios we must do some additiononal checks)
            // Check if this is part of a direct default export...
            x.isExportDefaultDeclaration() ||
            // ...or if this is the declaration of the variable with the given identifier name
            (identifier !== undefined &&
              x.isVariableDeclarator() &&
              t.isIdentifier(x.node.id, { name: identifier }))
          );
        })
      ) {
        path.node.properties = path.node.properties.filter(
          (x) =>
            !(
              t.isObjectProperty(x) &&
              t.isIdentifier(x.key) &&
              (generatorSpecificFields as string[]).includes(x.key.name)
            )
        );
      }
    },
  });
}

type UnknownObject = Record<string, unknown>;

function getArgCombinations(
  argTypes: Record<string, PropItem>,
  predefinedCombinations?: Partial<CartesianInput<UnknownObject>>
) {
  type ArgsMap = Record<string, unknown[]>;

  const argsMap: ArgsMap = {};

  logger?.debug();
  logger?.debug('=== Found variant for props ===');
  Object.entries(argTypes).forEach(([key, argType]) => {
    if (!argType) {
      return;
    }
    logger?.debug(`--- ${argType.name} ---`);
    logger?.debug('- type:', argType.type.name);
    logger?.debug(argType.type.value);
    const predefinedVariants = predefinedCombinations?.[key];
    const typeName = argType.type.name;
    if (predefinedVariants !== undefined) {
      argsMap[key] = predefinedVariants;
    } else if (typeName === 'enum' && Array.isArray(argType.type.value)) {
      argsMap[key] = (argType.type.value as Array<{ value: string }>).map((x) =>
        JSON.parse(x.value)
      );
    } else if (typeName === 'boolean') {
      argsMap[key] = [false, true];
    }
  });

  return cartesian(argsMap as CartesianInput<UnknownObject>);
}

function getVariantName<T extends object>(props: T) {
  return Object.entries(props)
    .map(([key, value]) => {
      switch (typeof value) {
        case 'boolean':
          return value ? key : undefined;
        case 'string':
          return camelCase(value);
        case 'undefined':
          return undefined;
        default:
          return `${key}-${value}`;
      }
    })
    .filter((x) => x !== undefined)
    .join('-');
}
