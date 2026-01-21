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
const SvgBarnehageFill = forwardRef(
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
    const __srcH = 21;
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
        viewBox="0 0 42 21"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#D3E6F6"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M39.86 5.774H12.934v13.164H39.86z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M36.29 10.877h-4.952v8.061h4.952z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M41 5.774H11.795L14.263 1h24.268z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 19.218s3.48 0 5.198-3.072c1.632-2.922 2.227-4.235 4.236-4.643l.799 7.715"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M19.944 11.26a1.267 1.267 0 1 0 0-2.533 1.267 1.267 0 0 0 0 2.534Z"
        />
        <path
          fill="#F2E8DA"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M23.186 9.772a1.045 1.045 0 1 0 0-2.09 1.045 1.045 0 0 0 0 2.09Z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M23.126 13.99H15.99v2.741h7.136z"
        />
        <path
          fill="#F2E8DA"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M28.407 12.567h-3.89v4.176h3.89z"
        />
      </svg>
    );
  },
);
export default SvgBarnehageFill;
