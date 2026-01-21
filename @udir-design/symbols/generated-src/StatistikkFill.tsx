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
const SvgStatistikkFill = forwardRef(
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
    const __srcH = 38;
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
        viewBox="0 0 42 38"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.2}
          d="m28.379 16.838.017.037.04.015 10.996 3.965a11.69 11.69 0 0 1-8.15 7.29 11.692 11.692 0 0 1-7.876-21.889z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.2}
          d="M36.64 7.584a11.7 11.7 0 0 1 3.83 5.88 11.7 11.7 0 0 1-.23 7.014l-10.867-3.917z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.2}
          d="M30.204 4.734A11.7 11.7 0 0 1 36.07 7.19l-7.252 8.963-4.9-10.437a11.7 11.7 0 0 1 6.285-.982Z"
        />
        <circle
          cx={2.015}
          cy={20.557}
          r={0.712}
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.2}
          transform="rotate(-17.16 2.015 20.557)"
        />
        <circle
          cx={6.43}
          cy={12.164}
          r={0.712}
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.2}
          transform="rotate(-17.16 6.43 12.164)"
        />
        <circle
          cx={13.569}
          cy={13.451}
          r={0.712}
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.2}
          transform="rotate(-17.16 13.569 13.451)"
        />
        <circle
          cx={21.377}
          cy={2.71}
          r={0.712}
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.2}
          transform="rotate(-17.16 21.377 2.71)"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="m2.414 19.912 3.711-7.073M7.151 12.329l5.711.978M14.082 12.94l6.864-9.633"
        />
        <rect
          width={2.958}
          height={7.225}
          x={3.294}
          y={29.493}
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.185}
          rx={0.37}
        />
        <rect
          width={2.958}
          height={11.701}
          x={7.773}
          y={25.017}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.185}
          rx={0.37}
        />
        <rect
          width={2.958}
          height={16.289}
          x={12.251}
          y={20.429}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.185}
          rx={0.37}
        />
        <rect
          width={2.958}
          height={9.035}
          x={16.73}
          y={27.684}
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.185}
          rx={0.37}
        />
      </svg>
    );
  },
);
export default SvgStatistikkFill;
