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
const SvgPuslespillbrikkeGrnn = forwardRef(
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
    const __srcH = 42;
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
        viewBox="0 0 42 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g clipPath="url(#PuslespillbrikkeGr\xF8nn_svg__a)">
          <path
            fill="#76C69D"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="m36.314 9.731-2.87 8.743s-.83 2.163.343 3.019c1.173.855 2.36-.012 3.172-.332.812-.321 2.536-.663 3.665 1.634 1.19 2.418-.754 4.893-1.545 5.405-1.209.78-3.212.853-4.276-.835-.594-.943-1.048-2.122-2.024-2.11-1.837.023-2.536 2.85-2.958 4.213-.344 1.105-2.164 6.861-2.164 6.861l-9.074-2.98s-1.946-.82-2.806.53c-.739 1.161-.233 2.022.212 2.584.82 1.035.376 2.918-1.012 3.865-1.308.892-2.387.768-4.291-.132s-2.435-2.503-2.034-3.798c.342-1.106.903-1.467 2.065-2.059 1.159-.592 1.703-1.837 1.038-2.683-.664-.846-2.049-1.138-3.214-1.552C7.695 29.802 1 27.575 1 27.575l2.992-9.11s.625-1.89 1.247-1.288c.426.412.797 1.325 1.293 1.925.543.657 1.698 1.768 3.583 1.528 1.885-.241 3.199-1.998 3.735-3.365.497-1.262 1.06-2.58-.458-4.824-1.276-1.887-3.483-1.656-4.438-1.38-.955.274-1.979 1.214-2.246.385-.296-.919.644-3.294.877-4.005C7.818 6.733 9.723 1 9.723 1l9.219 3.027s1.271.326 1.119 1.02c-.127.57-1.09.63-1.93 1.313-.639.522-2.843 2.697-.469 5.754 2.374 3.058 6.04 2.14 7.349 1.003 1.153-1 2.035-3.044 1.065-4.612s-.37-2.206.235-2.038c.502.14 2.905.97 3.594 1.196s6.407 2.068 6.407 2.068z"
          />
        </g>
        <defs>
          <clipPath id="PuslespillbrikkeGr\xF8nn_svg__a">
            <path fill="#fff" d="M0 0h42v41.937H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgPuslespillbrikkeGrnn;
