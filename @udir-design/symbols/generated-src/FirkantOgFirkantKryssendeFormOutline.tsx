import React, { type Ref, type SVGProps, forwardRef } from 'react';
interface SVGRProps {
  size?: number | string;
}
const SvgFirkantOgFirkantKryssendeFormOutline = forwardRef(
  (
    { size, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    const __srcW = 42;
    const __srcH = 42;
    const __isWide = true;
    const __sizeProps = (() => {
      if (props?.width != null || props?.height != null) return {};
      const v = size ?? (__isWide ? __srcW : __srcH); // set size based on original aspect ratio
      // An SVG attribute, not a style: a strict CSP blocks server-rendered style attributes.
      // The other dimension follows from the viewBox.
      return __isWide
        ? {
            width: v,
          }
        : {
            height: v,
          };
    })();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 42 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        {...props}
      >
        <rect
          width={26.267}
          height={26.267}
          x={14.533}
          y={14.533}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.8}
        />
        <rect
          width={26.267}
          height={26.267}
          x={1.2}
          y={1.2}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.8}
        />
      </svg>
    );
  },
);
export default SvgFirkantOgFirkantKryssendeFormOutline;
