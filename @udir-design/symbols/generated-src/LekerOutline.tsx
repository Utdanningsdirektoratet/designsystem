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
const SvgLekerOutline = forwardRef(
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
    const __srcH = 20;
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
        viewBox="0 0 42 20"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g
          stroke="#303030"
          strokeWidth={0.4}
          clipPath="url(#LekerOutline_svg__a)"
        >
          <path d="m27.527 15.561-8.773-.114M14.155 8.68l.087-6.688A1.007 1.007 0 0 1 15.257 1l14.332.187a1.01 1.01 0 0 1 .921.633q.073.184.07.385l-.03 2.307" />
          <path d="M18.556 17.502H1.845a.843.843 0 0 1-.7-1.32L9.502 3.89a.846.846 0 0 1 1.397 0l8.355 12.293a.838.838 0 0 1-.263 1.198.83.83 0 0 1-.435.12ZM41 11.3a7.4 7.4 0 0 1-2.274 5.35l-.026.024a7.4 7.4 0 0 1-5.13 2.056c-3.946 0-7.429-3.327-7.429-7.43A7.43 7.43 0 1 1 41 11.3Z" />
        </g>
        <defs>
          <clipPath id="LekerOutline_svg__a">
            <path fill="#fff" d="M0 0h42v19.73H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgLekerOutline;
