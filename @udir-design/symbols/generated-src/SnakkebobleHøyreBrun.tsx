'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
interface SVGRProps {
  size?: number | string;
}
const SvgSnakkebobleHyreBrun = forwardRef(
  (
    { size, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    const __srcW = 42;
    const __srcH = 33;
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
        viewBox="0 0 42 33"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        {...props}
      >
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M37.831 6.41C33.387.74 22.775-.188 10.718 2.3-3.208 5.173-.66 21.756 8.907 24.584c4.41 1.303 16.813.166 17.768.743.647 2.472 4.382 5.475 8.651 6.483-.83-1.185-2.312-3.735-2.787-6.483C42.103 23.71 43.1 13.129 37.832 6.409Z"
        />
      </svg>
    );
  },
);
export default SvgSnakkebobleHyreBrun;
