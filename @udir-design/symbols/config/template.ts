import type { Config } from '@svgr/core';

type Template = Required<Config>['template'];
type JSXOpeningElement = Parameters<Template>[0]['jsx']['openingElement'];
type JSXAttributeOrSpread = JSXOpeningElement['attributes'][number];
type JSXAttribute = Extract<JSXAttributeOrSpread, { type: 'JSXAttribute' }>;
type JSXSpreadAttribute = Extract<
  JSXAttributeOrSpread,
  { type: 'JSXSpreadAttribute' }
>;

const template: Template = (variables, { tpl }) => {
  // Analyze original SVG dimensions (width/height or viewBox)
  const svgOpen = variables.jsx.openingElement;
  const findAttr = (
    name: 'width' | 'height' | 'viewBox',
  ): JSXAttribute | undefined =>
    svgOpen.attributes.find(
      (a): a is JSXAttribute =>
        a.type === 'JSXAttribute' &&
        a.name.type === 'JSXIdentifier' &&
        a.name.name === name,
    );

  const widthAttr = findAttr('width');
  const heightAttr = findAttr('height');
  const viewBoxAttr = findAttr('viewBox');

  const asNumber = (attr?: JSXAttribute): number | null => {
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

  // Output
  return tpl`
import React, { type Ref, type SVGProps, forwardRef } from "react";

${variables.interfaces}
interface SVGRProps { size?: number | string; }

const ${variables.componentName} = forwardRef(({size, ...props}: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => {
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
