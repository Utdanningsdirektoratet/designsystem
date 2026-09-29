import {
  identifier,
  isIdentifier,
  isObjectPattern,
  isObjectProperty,
} from '@babel/types';
import type { Config } from '@svgr/core';

type Template = Required<Config>['template'];

/**
 * Generates the same components as @navikt/aksel-icons
 * (https://github.com/navikt/aksel/blob/main/@navikt/aksel-icons/config/template.js),
 * but without "use client" and with `useId` from React instead of Aksel's helper,
 * whose React 17 fallback uses `useState` and `useEffect`. Either would make every
 * icon a client component in React Server Components. Like Aksel's helper, it strips
 * the colons that React 18 and 19.0 put in ids.
 */
const template: Template = (variables, { tpl }) => {
  // svgr destructures `titleId` from the props. Rename it to `_titleId` so the
  // `titleId` variable below can fall back to a generated id.
  const [propsPattern] = variables.props;
  const titleIdProperty = isObjectPattern(propsPattern)
    ? propsPattern.properties.find(
        (property) =>
          isObjectProperty(property) &&
          isIdentifier(property.key, { name: 'titleId' }),
      )
    : undefined;
  if (!isObjectProperty(titleIdProperty)) {
    throw new Error(
      'Expected svgr to destructure `titleId` from the props. Is `titleProp` enabled?',
    );
  }
  titleIdProperty.value = identifier('_titleId');
  titleIdProperty.shorthand = false;

  // Explicit `forwardRef` type arguments without `ref`: with `SVGProps`, `@types/react`
  // wraps each icon's props in `Omit<…, "ref">`, which is slow to type-check for 959 icons.
  return tpl`
import React, { forwardRef, useId, type Ref, type SVGAttributes, type SVGProps } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
}

const ${variables.componentName} = forwardRef<SVGSVGElement, SVGAttributes<SVGSVGElement> & SVGRProps>((${variables.props}) => {
  let titleId: string | undefined = useId().replace(/:/g, "");
  titleId = title ? (_titleId ? _titleId : "title-" + titleId) : undefined;
  return ${variables.jsx};
});

export default ${variables.componentName};
`;
};

export default template;
