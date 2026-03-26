'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
interface SVGRProps {
  size?: number | string;
}
const SvgSamtalePPcOutline = forwardRef(
  (
    { size, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    const __srcW = 42;
    const __srcH = 26;
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
        viewBox="0 0 42 26"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        {...props}
      >
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M34.006 1H7.936c-.672 0-1.217.545-1.217 1.218v16.338c0 .672.545 1.218 1.218 1.218h26.07c.672 0 1.217-.546 1.217-1.218V2.218c0-.673-.545-1.218-1.218-1.218Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M33.406 1.609H8.536c-.672 0-1.217.545-1.217 1.218v14.222c0 .673.545 1.218 1.218 1.218h24.87c.672 0 1.217-.545 1.217-1.218V2.827c0-.673-.545-1.218-1.218-1.218Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M41 24.895v.438c0 .162-.13.293-.292.294L1.294 25.7A.293.293 0 0 1 1 25.41v-.438c0-.092.043-.178.116-.234l5.162-3.905.028-.02c.289-.178.62-.273.96-.274l27.455-.052c.335 0 .664.093.95.268q.015.008.029.018l5.183 3.889a.29.29 0 0 1 .117.233z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="M2.12 24.871h37.757M21.884 9.081c1.24-1.582 4.202-1.84 7.566-1.146 3.887.801 3.176 5.429.506 6.218-1.23.364-4.692.046-4.958.207-.181.69-1.223 1.528-2.415 1.81.232-.332.646-1.043.778-1.81-2.669-.45-2.947-3.404-1.477-5.279ZM19.857 5.216c-1.24-1.582-4.202-1.84-7.566-1.147-3.886.802-3.176 5.43-.506 6.219 1.231.363 4.692.046 4.959.207.18.69 1.223 1.528 2.414 1.81-.232-.332-.646-1.043-.778-1.81 2.669-.451 2.947-3.404 1.477-5.28Z"
        />
      </svg>
    );
  },
);
export default SvgSamtalePPcOutline;
