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
const SvgKnektBlyantOutline = forwardRef(
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
    const __srcH = 14;
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
        viewBox="0 0 42 14"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M37.068 11.066 38.626 7.9l1.028.507a1.5 1.5 0 0 1 .683 2.008l-.233.474a1.5 1.5 0 0 1-2.008.683z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m23.615 4.444 1.33-.289-1.058-1.484 1.3-.403-.252-1.107 13.691 6.74-1.558 3.165z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.3}
          d="M24.938 2.41 38.08 8.88l-.57 1.157-12.773-6.288-.677-1.079z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m20.714 1.166-.806 1.097 1.776.41-.707 1.164.922.663L7.178 8.517l-.929-3.403z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.3}
          d="M21.07 3.566 6.939 7.423l-.34-1.245L20.333 2.43l1.221.36z"
        />
        <path
          stroke="#303030"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m6.105 5.153.93 3.403-5.57-.308z"
        />
        <path
          stroke="#303030"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m4.25 8.402-2.786-.154L3.784 6.7z"
        />
      </svg>
    );
  },
);
export default SvgKnektBlyantOutline;
