'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
interface SVGRProps {
  size?: number | string;
}
const SvgStjerneOutline = forwardRef(
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
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m26.224 13.636.046.11.119.01 13.15 1.22-9.92 8.716-.09.08.026.115 2.903 12.885-11.355-6.744-.103-.06-.102.06L9.54 36.772l2.904-12.885.027-.116-.09-.079-9.922-8.716 13.151-1.22.118-.01.047-.11L21 1.505z"
        />
      </svg>
    );
  },
);
export default SvgStjerneOutline;
