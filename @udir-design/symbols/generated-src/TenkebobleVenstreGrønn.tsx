'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
import { useId } from './util/useId';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
interface SVGRProps {
  size?: number | string;
}
const SvgTenkebobleVenstreGrnn = forwardRef(
  (
    {
      size,
      title,
      titleId: _titleId,
      ...props
    }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    let titleId: string | undefined = useId();
    titleId = title ? (_titleId ? _titleId : 'title-' + titleId) : undefined;
    const __srcW = 42;
    const __srcH = 39;
    const __isWide = true;
    const __sizeProps = (() => {
      if (props?.width != null || props?.height != null) return {};
      const v = size ?? (__isWide ? __srcW : __srcH); // set size based on original aspect ratio
      return __isWide
        ? {
            style: {
              width: v,
            },
          }
        : {
            style: {
              height: v,
            },
          };
    })();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 42 39"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M17.936 29.174c4.938 4.019 9.423 1.292 11.048-.575 10.008 3.2 14.127-6.276 9.705-10.033 5.94-6.74-.737-13.887-6.895-12.049C29.67-1.121 22.386.513 20.261 3.454 13.497.023 10.028 4.802 9.768 7.742c-6.747 1.018-6 8.07-3.079 10.375-2.601 5.489 1.952 7.379 4.553 7.637.555 4.444 4.694 4.131 6.694 3.42ZM7.471 28.2c1.455 0 2.602 1.073 2.603 2.36 0 1.287-1.148 2.36-2.603 2.361-1.455 0-2.603-1.074-2.603-2.361S6.016 28.2 7.47 28.2ZM3.265 34.056c1.16 0 2.063.844 2.063 1.842s-.904 1.843-2.063 1.843S1.2 36.897 1.2 35.898c0-.998.905-1.842 2.065-1.842Z"
        />
      </svg>
    );
  },
);
export default SvgTenkebobleVenstreGrnn;
