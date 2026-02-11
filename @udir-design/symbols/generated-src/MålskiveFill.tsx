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
const SvgMlskiveFill = forwardRef(
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
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M18.12 1.2c9.315 0 16.917 8.835 16.917 19.8S27.435 40.8 18.12 40.8 1.2 31.966 1.2 21 8.803 1.2 18.12 1.2Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M18.77 6.426c6.779 0 12.328 6.493 12.328 14.574S25.549 35.574 18.77 35.574C11.99 35.574 6.442 29.08 6.442 21S11.99 6.426 18.77 6.426Z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeWidth={0.4}
          d="M19.178 11.85c4.297 0 7.83 4.067 7.83 9.15s-3.533 9.15-7.83 9.15-7.83-4.067-7.83-9.15c0-5.082 3.533-9.15 7.83-9.15Z"
        />
        <path
          fill="#5BA27E"
          stroke="#303030"
          strokeWidth={0.4}
          d="M19.414 17.057c1.841 0 3.381 1.738 3.381 3.944s-1.54 3.942-3.381 3.942c-1.842 0-3.382-1.737-3.382-3.942s1.54-3.944 3.382-3.944Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          d="m19.414 21 20.65-7.771"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.4}
          d="m38.87 13.668.618-1.431M38.664 15.104l-1.347-.783M38.087 13.876l.618-1.43M39.521 14.796l-1.347-.783M37.252 14.2l.618-1.432M40.275 14.467l-1.348-.783"
        />
      </svg>
    );
  },
);
export default SvgMlskiveFill;
