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
const SvgTabellOutline = forwardRef(
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
    const __srcH = 40;
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
        viewBox="0 0 42 40"
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
          d="M40.8 7.954v28.883a1.8 1.8 0 0 1-1.8 1.8H3a1.8 1.8 0 0 1-1.8-1.8V7.954z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M3 1.2h36A1.8 1.8 0 0 1 40.8 3v4.993H1.2V3A1.8 1.8 0 0 1 3 1.2ZM11.419 8.193v30.644M1.29 23.315H41M30.981 8.193v30.644M1.29 28.576H41M1.29 12.793H41M21.2 8.193v30.644M1.29 33.837H41M1.29 18.054H41"
        />
      </svg>
    );
  },
);
export default SvgTabellOutline;
