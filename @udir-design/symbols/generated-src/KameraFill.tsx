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
const SvgKameraFill = forwardRef(
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
    const __srcH = 34;
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
        viewBox="0 0 42 34"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#CCEADA"
          stroke="#303030"
          strokeWidth={0.4}
          d="M2.86 6.663h36.254a1.66 1.66 0 0 1 1.661 1.653L40.8 13.3H1.2V8.323c0-.917.743-1.66 1.66-1.66Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M40.8 13.2v17.94a1.66 1.66 0 0 1-1.66 1.66H2.86a1.66 1.66 0 0 1-1.66-1.66V13.2z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.8}
          d="M9.119 3.988h1.877a.53.53 0 0 1 .53.53V6.35H8.589V4.518a.53.53 0 0 1 .53-.53Z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          d="m25.873 1.2 1.873 5.35H14.508L16.38 1.2z"
        />
        <circle
          cx={21.127}
          cy={19.977}
          r={11.091}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={1.395}
        />
        <circle
          cx={21.127}
          cy={19.977}
          r={7.851}
          fill="#D3E6F6"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <path stroke="#303030" d="M36.366 15.451h2.875" />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M38.291 27.453v2.875M6.663 17.964v14.664"
        />
      </svg>
    );
  },
);
export default SvgKameraFill;
