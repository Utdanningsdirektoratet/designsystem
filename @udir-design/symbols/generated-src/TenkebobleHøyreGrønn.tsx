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
const SvgTenkebobleHyreGrnn = forwardRef(
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
          d="M24.064 29.174c-4.937 4.019-9.423 1.292-11.048-.575-10.008 3.2-14.127-6.276-9.705-10.033-5.94-6.74.737-13.887 6.895-12.049C12.33-1.121 19.615.513 21.739 3.454 28.503.023 31.972 4.802 32.232 7.742c6.747 1.018 6 8.07 3.079 10.375 2.601 5.489-1.952 7.379-4.553 7.637-.555 4.444-4.694 4.131-6.694 3.42ZM34.529 28.2c-1.455 0-2.603 1.073-2.603 2.36s1.148 2.36 2.603 2.361c1.455 0 2.603-1.074 2.603-2.361s-1.148-2.36-2.603-2.36ZM38.735 34.056c-1.16 0-2.063.844-2.063 1.842s.904 1.843 2.063 1.843 2.065-.844 2.065-1.843c0-.998-.905-1.842-2.065-1.842Z"
        />
      </svg>
    );
  },
);
export default SvgTenkebobleHyreGrnn;
