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
const SvgSprsmlstegnGrnn = forwardRef(
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
    const __srcW = 23;
    const __srcH = 42;
    const __isWide = false;
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
        viewBox="0 0 23 42"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1.074 14.388h4.76s-.929-8.66 5.35-9.001c6.328-.344 7.196 6.827 4.442 9.97-1.56 1.78-3.548 2.667-5.78 4.9-1.827 1.827-2.364 4.233-2.33 6.473.055 3.552.13 5.638.13 5.638h5.039s-.363-5.863.463-7.69c1.297-2.872 3.019-3.076 6.192-6.008 1.915-1.77 3.554-6.168 1.559-11.757C19.146 2.012 14.41.644 10.242 1.074c-2.702.28-5.55 1.64-7.598 4.853-2.023 3.176-1.64 6.444-1.57 8.46ZM10.426 41a2.46 2.46 0 1 0 0-4.921 2.46 2.46 0 0 0 0 4.92Z"
        />
      </svg>
    );
  },
);
export default SvgSprsmlstegnGrnn;
