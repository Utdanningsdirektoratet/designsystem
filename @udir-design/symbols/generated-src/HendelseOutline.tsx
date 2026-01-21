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
const SvgHendelseOutline = forwardRef(
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
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M40.8 10.047V37.63a3.1 3.1 0 0 1-3.102 3.102H4.302A3.1 3.1 0 0 1 1.2 37.629V10.047z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M10.339 3.094h21.334m-22.299 0H4.517a3.3 3.3 0 0 0-3.302 3.302v3.666h39.566V6.396a3.3 3.3 0 0 0-3.302-3.302H32.63"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M10.21 5.262c.629.141 1.059.815 1.059 1.433a1.536 1.536 0 1 1-3.073 0c0-.618.44-1.266 1.049-1.433M32.745 5.262c.629.141 1.059.815 1.059 1.433a1.536 1.536 0 0 1-3.073 0c0-.618.44-1.266 1.049-1.433"
        />
        <rect
          width={1}
          height={5.477}
          x={9.232}
          y={1.2}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.213}
        />
        <rect
          width={1}
          height={5.477}
          x={31.767}
          y={1.2}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.213}
        />
      </svg>
    );
  },
);
export default SvgHendelseOutline;
