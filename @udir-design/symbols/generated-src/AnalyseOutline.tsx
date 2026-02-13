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
const SvgAnalyseOutline = forwardRef(
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
    const __srcH = 37;
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
        viewBox="0 0 42 37"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <rect
          width={5.008}
          height={12.351}
          x={1.2}
          y={18.413}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.616}
        />
        <rect
          width={5.008}
          height={20.053}
          x={8.906}
          y={10.71}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.616}
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M21.821 19.236v10.912c0 .45-.365.815-.815.815h-3.778a.816.816 0 0 1-.815-.815V3.43c0-.45.365-.815.815-.815h3.778c.45 0 .815.365.815.815v3.787M29.528 20.271v9.877c0 .45-.366.815-.816.815h-3.777a.816.816 0 0 1-.816-.815V19.91"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.738}
          d="M25.285 6.514a6.707 6.707 0 1 1-.863 13.386 6.707 6.707 0 0 1 .863-13.386Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.295}
          d="M20.148 10.81c-.552.883-1.078 2.786-.05 4.596"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.295}
          d="M20.484 12.04c-.387.793-.573 1.998.457 3.508"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m30.478 17.594 8.663 9.979a.54.54 0 0 1-.055.758l-1.023.889a.54.54 0 0 1-.758-.054l-8.663-9.98zM2.817 14.876l9.852-9.75"
        />
        <path
          fill="#303030"
          stroke="#303030"
          d="m13.468 5.28-.838-.829 1.152-.326z"
        />
      </svg>
    );
  },
);
export default SvgAnalyseOutline;
