const template = (variables, { tpl }) => {
  const imports = variables.imports.filter(
    (imp) =>
      !(imp.type === 'ImportDeclaration' && imp.source.value === 'react'),
  );
  imports.push({
    type: 'ImportDeclaration',
    specifiers: [
      {
        type: 'ImportSpecifier',
        imported: { type: 'Identifier', name: 'useId' },
      },
    ],
    source: { type: 'StringLiteral', value: './util/useId' },
  });

  const titleIdProp = variables.props[0].properties.find(
    (prop) => prop.key.name === 'titleId',
  );
  if (titleIdProp) {
    titleIdProp.value = { type: 'Identifier', name: '_titleId' };
  }

  // Analyze original SVG dimensions (width/height or viewBox)
  const svgOpen = variables.jsx.openingElement;
  const findAttr = (name) =>
    svgOpen.attributes.find(
      (a) => a.type === 'JSXAttribute' && a.name?.name === name,
    );

  const widthAttr = findAttr('width');
  const heightAttr = findAttr('height');
  const viewBoxAttr = findAttr('viewBox');

  const asNumber = (attr) => {
    if (!attr?.value) return null;
    if (attr.value.type === 'StringLiteral')
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

  const isWide = srcW >= srcH;

  // Insert {...__sizeProps} before {...props} so user props override defaults
  const propsSpreadIdx = svgOpen.attributes.findIndex(
    (a) =>
      a.type === 'JSXSpreadAttribute' &&
      a.argument?.type === 'Identifier' &&
      a.argument.name === 'props',
  );
  const sizeSpread = {
    type: 'JSXSpreadAttribute',
    argument: { type: 'Identifier', name: '__sizeProps' },
  };
  if (propsSpreadIdx >= 0)
    svgOpen.attributes.splice(propsSpreadIdx, 0, sizeSpread);
  else svgOpen.attributes.push(sizeSpread);

  // Add size to props; ensure ...props is present
  try {
    const firstParam = Array.isArray(variables.props)
      ? variables.props[0]
      : variables.props;
    if (firstParam?.type === 'ObjectPattern') {
      const hasSize = firstParam.properties.some((p) => p.key?.name === 'size');
      if (!hasSize) {
        firstParam.properties.unshift({
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'size' },
          value: { type: 'Identifier', name: 'size' },
          shorthand: true,
        });
      }
      const hasRest = firstParam.properties.some(
        (p) => p.type === 'RestElement',
      );
      if (!hasRest) {
        firstParam.properties.push({
          type: 'RestElement',
          argument: { type: 'Identifier', name: 'props' },
        });
      }
    }
  } catch {}

  // Output
  return tpl`
"use client";
import React, { forwardRef, type Ref, type SVGProps } from "react";
${imports};

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
    const v = size ?? (__isWide ? __srcW : __srcH);   // use the original largest side
    return __isWide ? { width: v } : { height: v };   // set the dominant dimension
  })();

  return ${variables.jsx};
});
export default ${variables.componentName}
`;
};

export default template;
