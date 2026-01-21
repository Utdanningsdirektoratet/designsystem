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
const SvgVitnemlOutline = forwardRef(
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
    const __srcH = 40;
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
        viewBox="0 0 42 40"
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
          clipPath="url(#Vitnem\xE5lOutline_svg__a)"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M35.134 30.092V9.339A8.34 8.34 0 0 0 26.793 1L1 1.015c4.368.265 5.963 3.89 5.963 8.324L6.96 33.647a5.287 5.287 0 0 0 5.288 5.288M30.296 27.835H11.288M17.465 31.185h-6.177M30.296 24.485H11.288"
          />
          <path
            strokeMiterlimit={10}
            d="M12.249 38.945a.01.01 0 0 1-.01-.01.01.01 0 0 1 .01-.01 5.283 5.283 0 0 0 5.277-5.278v-3.545q0-.01.01-.01H40.99q.009 0 .01.01v3.545a5.303 5.303 0 0 1-5.298 5.297z"
          />
          <path d="M13.263 13.76c-.554 1.09-1.46 3.386-1.53 6.825a.067.067 0 0 0 .104.056l1.437-1.002a.07.07 0 0 1 .085.006l1.32 1.312c.043.042.115.012.113-.048-.021-.741-.027-3.8 1.18-6.037M16.179 14.873c.296.749 1.817 4.205 4.867 4.922q.017.002.022-.015l.127-1.5q0-.008.008-.013l1.293-.664c.014-.007.014-.025 0-.03-.333-.133-3.056-1.281-3.81-3.605" />
          <path d="M16.094 6.736a4.069 4.069 0 1 0 0 8.137 4.069 4.069 0 1 0 0-8.137Z" />
        </g>
        <defs>
          <clipPath id="Vitnem\xE5lOutline_svg__a">
            <path fill="#fff" d="M0 0h42v39.945H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgVitnemlOutline;
