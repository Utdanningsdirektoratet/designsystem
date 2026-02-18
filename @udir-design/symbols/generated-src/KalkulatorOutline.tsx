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
const SvgKalkulatorOutline = forwardRef(
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
    const __srcW = 29;
    const __srcH = 42;
    const __isWide = false;
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
        viewBox="0 0 29 42"
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
          d="M3.45 1.2h21.348a2.25 2.25 0 0 1 2.25 2.25v35.098a2.25 2.25 0 0 1-2.252 2.252H3.452A2.25 2.25 0 0 1 1.2 38.548V3.45A2.25 2.25 0 0 1 3.45 1.2Z"
        />
        <rect
          width={4.121}
          height={4.13}
          x={3.701}
          y={15.634}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={3.701}
          y={21.342}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={3.701}
          y={27.049}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={3.701}
          y={32.757}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={14.851}
          y={15.634}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={14.851}
          y={21.342}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={14.851}
          y={27.049}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={14.851}
          y={32.757}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={9.276}
          y={15.634}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={9.276}
          y={21.342}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={9.276}
          y={27.049}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={9.276}
          y={32.757}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={20.426}
          y={15.634}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={20.426}
          y={21.342}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={20.426}
          y={27.049}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <rect
          width={4.121}
          height={4.13}
          x={20.426}
          y={32.757}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.543}
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M24.004 3.895H4.244a.743.743 0 0 0-.743.743v7.544c0 .41.333.743.743.743h19.76c.41 0 .743-.333.743-.743V4.638a.743.743 0 0 0-.743-.743Z"
        />
      </svg>
    );
  },
);
export default SvgKalkulatorOutline;
