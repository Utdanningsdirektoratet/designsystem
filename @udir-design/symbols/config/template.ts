import {
  blockStatement,
  identifier,
  importDefaultSpecifier,
  isIdentifier,
  isImportDeclaration,
  isObjectProperty,
  isStringLiteral,
  traverseFast,
} from '@babel/types';
import type {
  Identifier,
  JSXAttribute,
  JSXIdentifier,
  JSXOpeningElement,
  JSXSpreadAttribute,
  ObjectPattern,
  ObjectProperty,
  RestElement,
} from '@babel/types';
import type { Config } from '@svgr/core';

type Template = Required<Config>['template'];

const template: Template = (variables, { tpl }) => {
  traverseFast(blockStatement(variables.imports), (node) => {
    if (
      isImportDeclaration(node) &&
      node.source.value === 'react' &&
      node.importKind !== 'type'
    ) {
      node.specifiers.unshift(importDefaultSpecifier(identifier('React')));
    }
  });

  // Rename titleId to _titleId to avoid conflict with generated variable
  const firstParam = (
    Array.isArray(variables.props) ? variables.props[0] : variables.props
  ) as ObjectPattern | undefined;

  if (firstParam?.type === 'ObjectPattern') {
    const titleIdProp = firstParam.properties.find(
      (p): p is ObjectProperty =>
        p.type === 'ObjectProperty' &&
        (p.key as Identifier | undefined)?.name === 'titleId',
    );
    if (titleIdProp) {
      titleIdProp.value = {
        type: 'Identifier',
        name: '_titleId',
      } satisfies Identifier;
    }
  }

  // Analyze original SVG dimensions (width/height or viewBox)
  const svgOpen = variables.jsx.openingElement as JSXOpeningElement;
  const findAttr = (
    name: 'width' | 'height' | 'viewBox',
  ): JSXAttribute | undefined =>
    svgOpen.attributes.find(
      (a): a is JSXAttribute =>
        a.type === 'JSXAttribute' &&
        (a.name as JSXIdentifier | undefined)?.name === name,
    );

  const widthAttr = findAttr('width');
  const heightAttr = findAttr('height');
  const viewBoxAttr = findAttr('viewBox');

  const asNumber = (attr?: JSXAttribute): number | null => {
    if (!attr?.value) return null;
    if (isStringLiteral(attr.value))
      return parseFloat(String(attr.value.value).replace(/px$/i, ''));
    if (
      attr.value.type === 'JSXExpressionContainer' &&
      attr.value.expression.type === 'NumericLiteral'
    )
      return Number(attr.value.expression.value);
    return null;
  };

  let srcW = asNumber(widthAttr);
  let srcH = asNumber(heightAttr);

  if ((!srcW || !srcH) && viewBoxAttr?.value?.type === 'StringLiteral') {
    const [, , vbW, vbH] = viewBoxAttr.value.value.split(/\s+/).map(Number);
    if (!srcW) srcW = vbW;
    if (!srcH) srcH = vbH;
  }

  const isWide = (srcW ?? 1) >= (srcH ?? 1);

  // Insert {...__sizeProps} before {...props} so user props override defaults
  const propsSpreadIdx = svgOpen.attributes.findIndex(
    (a) =>
      a.type === 'JSXSpreadAttribute' &&
      a.argument?.type === 'Identifier' &&
      a.argument.name === 'props',
  );
  const sizeSpread: JSXSpreadAttribute = {
    type: 'JSXSpreadAttribute',
    argument: { type: 'Identifier', name: '__sizeProps' },
  };
  if (propsSpreadIdx >= 0)
    svgOpen.attributes.splice(propsSpreadIdx, 0, sizeSpread);
  else svgOpen.attributes.push(sizeSpread);

  // Add size to props; ensure ...props is present
  try {
    const firstParam = (
      Array.isArray(variables.props) ? variables.props[0] : variables.props
    ) as ObjectPattern | undefined;

    if (firstParam?.type === 'ObjectPattern') {
      const hasSize = firstParam.properties.some(
        (p): p is ObjectProperty =>
          isObjectProperty(p) &&
          !p.computed &&
          isIdentifier(p.key, { name: 'size' }),
      );

      if (!hasSize) {
        const sizeProp: ObjectProperty = {
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'size' },
          value: { type: 'Identifier', name: 'size' },
          shorthand: true,
          computed: false,
        };
        firstParam.properties.unshift(sizeProp);
      }

      const hasRest = firstParam.properties.some(
        (p): p is RestElement => p.type === 'RestElement',
      );
      if (!hasRest) {
        const rest: RestElement = {
          type: 'RestElement',
          argument: { type: 'Identifier', name: 'props' },
        };
        firstParam.properties.push(rest);
      }
    }
  } catch {
    // be intentionally silent
  }

  // Output
  return tpl`
"use client";
import React, { type Ref, type SVGProps, forwardRef } from "react";
import { useId } from "./util/useId";

${variables.interfaces}
interface SVGRProps { size?: number | string; }

const ${variables.componentName} = forwardRef((${variables.props}) => {
  let titleId: string | undefined = useId();
  titleId = title ? (_titleId ? _titleId : "title-" + titleId) : undefined;

  const __srcW = ${JSON.stringify(srcW)};
  const __srcH = ${JSON.stringify(srcH)};
  const __isWide = ${JSON.stringify(isWide)};

  const __sizeProps = (() => {
    if (props?.width != null || props?.height != null) return {};
    const v = size ?? (__isWide ? __srcW : __srcH);   // set size based on original aspect ratio
    return __isWide ? { style: { width: v, height: "auto" } } : { style: { height: v, width: "auto" } }; 
  })();


  return ${variables.jsx};
});
export default ${variables.componentName}
`;
};

export default template;
