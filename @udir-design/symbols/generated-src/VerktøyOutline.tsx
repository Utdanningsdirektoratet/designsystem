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
const SvgVerktyOutline = forwardRef(
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
        <g
          stroke="#303030"
          strokeWidth={0.4}
          clipPath="url(#Verkt\xF8yOutline_svg__a)"
        >
          <path d="m19.82 18.16 9.94-9.938v-.045c-.536-1.921 0-4.02 1.474-5.493 1.444-1.445 3.374-1.96 5.173-1.545a.163.163 0 0 1 .08.272l-3.255 3.375a.31.31 0 0 0 .004.436l3.585 3.584a.31.31 0 0 0 .438.001l3.324-3.284a.163.163 0 0 1 .275.082 5.68 5.68 0 0 1-1.541 5.161c-1.519 1.519-3.618 2.01-5.494 1.475h-.044l-8.332 8.331M20.624 25.396 5.02 41h-.045L1 37.026v-.045l17.124-17.123" />
          <path d="M22.475 20.815 8.407 6.747l-1.34-3.26-3.393-1.071-1.25 1.294L3.45 7.06l3.26 1.385 14.068 14.067" />
          <path d="m39.356 31.666-7.262-7.26a6.8 6.8 0 0 0-1.76-1.27l-.547-.273a11.6 11.6 0 0 1-2.876-2.04.283.283 0 0 0-.39-.004l-.23.212a.283.283 0 0 1-.392-.007l-1.616-1.617a.283.283 0 0 0-.4 0l-4.424 4.423c-.11.11-.11.29 0 .4l1.623 1.624a.283.283 0 0 1 .014.385l-.235.271a.283.283 0 0 0 .014.386 10.4 10.4 0 0 1 1.898 2.604l.27.526c.423.82.97 1.571 1.623 2.224l7.053 7.053c2.1 2.143 5.582 2.143 7.726 0 2.054-2.054 2.054-5.537-.09-7.637Z" />
        </g>
        <defs>
          <clipPath id="Verkt\xF8yOutline_svg__a">
            <path fill="#fff" d="M0 0h41.975v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgVerktyOutline;
