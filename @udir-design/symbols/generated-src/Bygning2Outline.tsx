'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
interface SVGRProps {
  size?: number | string;
}
const SvgBygning2Outline = forwardRef(
  (
    { size, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    const __srcW = 42;
    const __srcH = 24;
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
        viewBox="0 0 42 24"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        {...props}
      >
        <g
          stroke="#303030"
          strokeWidth={0.4}
          clipPath="url(#Bygning2Outline_svg__a)"
        >
          <path d="M9.38 22.277V5.545L21.023 1l11.596 4.545v16.732zM32.62 22.277V7.77H41v14.507zM1 22.277V7.77h8.38v14.507z" />
          <path d="M17.246 22.277v-8.104H21v8.104zM21 22.277v-8.104h3.753v8.104z" />
        </g>
        <defs>
          <clipPath id="Bygning2Outline_svg__a">
            <path fill="#fff" d="M0 0h42v23.277H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgBygning2Outline;
