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
const SvgKameraOutline = forwardRef(
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
          stroke="#303030"
          strokeWidth={0.4}
          d="M2.86 6.663h36.254a1.66 1.66 0 0 1 1.661 1.653L40.8 13.3h-10.23l-4.446-3.458-.037-.028-.047-.01L21 8.796l-5.04 1.008-.052.01-.04.036-3.943 3.45H1.2V8.323c0-.917.743-1.66 1.66-1.66Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m26.405 10.182 3.465 2.97.056.048H40.8v17.94a1.66 1.66 0 0 1-1.66 1.66H2.86a1.66 1.66 0 0 1-1.66-1.66V13.2h11.383l.059-.058 2.962-2.963L21 8.707z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.8}
          d="M9.119 3.988h1.877a.53.53 0 0 1 .53.53V6.35H8.589V4.518a.53.53 0 0 1 .53-.53Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m25.873 1.2 1.873 5.35H14.508L16.38 1.2z"
        />
        <circle
          cx={21.127}
          cy={19.977}
          r={11.091}
          stroke="#303030"
          strokeWidth={1.395}
        />
        <circle
          cx={21.127}
          cy={19.977}
          r={7.851}
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
export default SvgKameraOutline;
