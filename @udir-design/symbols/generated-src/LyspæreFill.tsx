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
const SvgLyspreFill = forwardRef(
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
    const __srcW = 34;
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
        viewBox="0 0 34 42"
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
          clipPath="url(#Lysp\xE6reFill_svg__a)"
        >
          <path
            fill="#FBF3E8"
            d="M18.521 34.53h-3.119l-1.805-3.283a9.379 9.379 0 0 0-3.12-6.977 9.751 9.751 0 0 1 .964-15.357 9.73 9.73 0 0 1 5.57-1.7 9.74 9.74 0 0 1 5.54 1.77 9.755 9.755 0 0 1 .772 15.37 8.9 8.9 0 0 0-2.298 3.107 8.9 8.9 0 0 0-.78 3.787z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.153 33.3V19.55c0-.242.048-.48.139-.7a1.77 1.77 0 0 1 1.005-.977c.222-.091.46-.132.702-.128.484-.004.948.185 1.297.521.344.341.541.8.55 1.285 0 .242-.05.48-.14.702a1.763 1.763 0 0 1-1.006.976c-.22.091-.459.132-.7.128h-6.28a1.84 1.84 0 0 1-1.298-.521 1.85 1.85 0 0 1-.549-1.285c0-.242.049-.48.14-.702a1.767 1.767 0 0 1 1.006-.977c.22-.09.459-.131.7-.127.485-.004.949.185 1.298.521.345.341.541.8.55 1.285V33.3M16.921 4.242V1M4.242 16.642H1M32.892 16.642H29.65M6.948 8.183 4.649 5.925M26.443 8.347 28.7 6.089"
          />
          <path
            fill="#303030"
            d="M16.985 41c1.568 0 2.838-1.169 2.838-2.609s-1.27-2.607-2.838-2.607-2.84 1.167-2.84 2.607S15.418 41 16.986 41Z"
          />
          <path
            fill="#76C69D"
            d="M20.04 31.169h-6.107c-1.616 0-1.657 2.556-.126 2.688q.003 0 .005.002.001 0 .002.003l-.002.003-.005.001c-1.49.129-1.497 2.563.013 2.684.006 0 .006.008 0 .008-1.552.122-1.5 2.688.113 2.688h6.107c1.616 0 1.661-2.566.112-2.688-.006 0-.006-.008 0-.008 1.512-.121 1.502-2.555.013-2.684l-.005-.001-.002-.003.002-.004.005-.001c1.532-.132 1.49-2.688-.125-2.688Z"
          />
        </g>
        <defs>
          <clipPath id="Lysp\xE6reFill_svg__a">
            <path fill="#fff" d="M0 0h33.892v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgLyspreFill;
