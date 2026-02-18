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
const SvgHendelseFill = forwardRef(
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
          fill="#E0EFFB"
          stroke="#303030"
          strokeWidth={0.4}
          d="M40.8 10.047V37.63a3.1 3.1 0 0 1-3.102 3.102H4.302A3.1 3.1 0 0 1 1.2 37.629V10.047z"
        />
        <path
          fill="#C8DEF0"
          stroke="#303030"
          strokeWidth={0.4}
          d="M4.302 3.294h33.396A3.1 3.1 0 0 1 40.8 6.396v3.69H1.2v-3.69a3.1 3.1 0 0 1 3.102-3.102Z"
        />
        <circle
          cx={9.733}
          cy={6.69}
          r={1.463}
          fill="#6D889D"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={32.267}
          cy={6.69}
          r={1.463}
          fill="#6D889D"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <rect
          width={1}
          height={5.477}
          x={9.232}
          y={1.2}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.213}
        />
        <rect
          width={1}
          height={5.477}
          x={31.767}
          y={1.2}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.213}
        />
      </svg>
    );
  },
);
export default SvgHendelseFill;
