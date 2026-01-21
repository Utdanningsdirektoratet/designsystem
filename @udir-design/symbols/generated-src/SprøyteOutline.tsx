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
const SvgSpryteOutline = forwardRef(
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
    const __srcW = 22;
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
        viewBox="0 0 22 42"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m2.356 11.806 5.036-1.99q.017-.006.022-.001l9.52 23.782-5.287 2.089L2.34 11.819s.005-.009.015-.013Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m9.995 36.338 8.588-3.394a1.26 1.26 0 0 1 1.637.71l.07.18v.003L9.363 38.154l-.004-.002-.072-.182a1.26 1.26 0 0 1 .707-1.632Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="m13.617 36.473 2.426-.955.009-.003.989 2.358-2.548 1.002-.885-2.399s.125-.049.009-.004z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m13.314 39.364 4.907-1.933a1.26 1.26 0 0 1 1.636.712l-.001.004-7.245 2.852-.004-.002v-.002a1.26 1.26 0 0 1 .707-1.631ZM4.183 11.085l1.378-.544-1.35-3.418-1.378.544z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.258}
          d="m3.616 15.1 1.865-.736M5.354 19.497l1.863-.735M7.09 23.895l1.864-.735M8.826 28.294l1.864-.736M10.563 32.691l1.864-.735M3.529 7.392 1 1"
        />
      </svg>
    );
  },
);
export default SvgSpryteOutline;
