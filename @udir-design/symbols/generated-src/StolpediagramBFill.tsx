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
const SvgStolpediagramBFill = forwardRef(
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
        <rect
          width={7.141}
          height={17.436}
          x={1.221}
          y={23.09}
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
        <rect
          width={7.141}
          height={28.236}
          x={12.027}
          y={12.29}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
        <rect
          width={7.141}
          height={39.306}
          x={22.832}
          y={1.221}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
        <rect
          width={7.141}
          height={21.802}
          x={33.638}
          y={18.724}
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.442}
          rx={0.884}
        />
      </svg>
    );
  },
);
export default SvgStolpediagramBFill;
