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
const SvgKlokkeFill = forwardRef(
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
        <circle
          cx={21}
          cy={21}
          r={19.8}
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={21}
          cy={21}
          r={17.045}
          fill="#E0EFFB"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M21 5.005V7.77M5.002 21.003h2.766M21 34.234v2.767M34.232 21.003h2.766M7.145 29.002l2.396-1.383M32.459 14.387l2.396-1.383M13 34.858l1.384-2.396M27.616 9.544l1.383-2.396M13 7.148l1.384 2.396M27.616 32.462l1.383 2.396M7.145 13.004l2.396 1.383M32.459 27.619l2.396 1.383"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="m22.088 17.398-.592 2.845a.1.1 0 0 0 .167.093l2.092-1.995a.1.1 0 0 0 .023-.033l2.953-6.92c.047-.11-.102-.195-.173-.099l-4.453 6.07a.1.1 0 0 0-.017.04ZM18.052 21.925l1.916-.83a.1.1 0 0 0 .003-.182l-1.866-.89a.1.1 0 0 0-.057-.008l-5.133.691c-.111.015-.117.175-.006.197l5.083 1.028a.1.1 0 0 0 .06-.006Z"
        />
        <circle cx={21} cy={20.997} r={1} fill="#303030" />
      </svg>
    );
  },
);
export default SvgKlokkeFill;
