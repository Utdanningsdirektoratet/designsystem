'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
interface SVGRProps {
  size?: number | string;
}
const SvgStolpediagramBOutline = forwardRef(
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
      return __isWide
        ? {
            style: {
              width: v,
              height: 'auto',
            },
          }
        : {
            style: {
              height: v,
              width: 'auto',
            },
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
          width={7.141}
          height={17.436}
          x={1.221}
          y={23.09}
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
        <rect
          width={7.141}
          height={28.236}
          x={12.027}
          y={12.29}
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
        <rect
          width={7.141}
          height={39.306}
          x={22.832}
          y={1.221}
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
        <rect
          width={7.141}
          height={21.802}
          x={33.638}
          y={18.724}
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
      </svg>
    );
  },
);
export default SvgStolpediagramBOutline;
