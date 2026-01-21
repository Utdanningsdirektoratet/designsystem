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
const SvgSykkelOutline = forwardRef(
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
    const __srcH = 27;
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
        viewBox="0 0 42 27"
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
          strokeMiterlimit={10}
          clipPath="url(#SykkelOutline_svg__a)"
        >
          <path
            strokeWidth={0.4}
            d="M20.504 19.782a2.323 2.323 0 1 0-2.325-2.322 2.323 2.323 0 0 0 2.325 2.322Z"
          />
          <path
            strokeLinecap="round"
            strokeWidth={0.4}
            d="M29.471 2.108c0 1.207-1.128 1.196-1.128 1.196H24.23s-.235.006-.235-.36c0-.303.13-.4.208-.4.079 0 3.25-.527 3.812-.641.479-.097.854-.347 1.047-.7.136-.25.409.222.409.904z"
          />
          <path strokeWidth={0.4} d="M20.504 15.138v-2.742" />
          <path
            strokeLinecap="round"
            strokeWidth={0.4}
            d="M19.705 12.396h1.599"
          />
          <path strokeWidth={0.4} d="M20.504 19.783v2.741" />
          <path
            strokeLinecap="round"
            strokeWidth={0.4}
            d="M21.304 22.524h-1.6"
          />
          <path
            strokeWidth={0.4}
            d="M10.248 4.162v3.1s2.629-.194 2.629-1.55-2.629-1.55-2.629-1.55Z"
          />
          <path
            strokeWidth={0.3}
            d="m29.96 10.191-2.608-5.77-.028-1.117h-1.127l.028 1.201.872 1.9-11.293 2.638L14.429 6.9l1.21-3.091c-.119-.564-.271-1.48-.271-1.48l-.508.086-.449.076s.137.696.216 1.251L13.62 6.247l-.167.416-1.502 3.496m13.67 7.678 7.209-.015.563-.038-3.035-6.714m-17.542-.54 1.106-2.588 6.32 9.895h4.417m-13.096-6.775L8.65 17.837h1.043l2.74-6.41m12.226 5.516-3.97-.003-4.322-7.006 11.155-2.62 1.523 3.287m.404.874 2.535 5.475-6.308-.006M32.83 10.635V25.04M40.038 17.837H25.621M27.732 22.93l10.194-10.186M27.732 12.744 37.926 22.93"
          />
          <path
            strokeWidth={0.349}
            d="M32.83 9.674c-4.513 0-8.17 3.655-8.17 8.163S28.316 26 32.83 26c4.512 0 8.17-3.655 8.17-8.163s-3.658-8.163-8.17-8.163Zm0 15.365a7.205 7.205 0 0 1-7.209-7.202 7.205 7.205 0 0 1 7.209-7.202 7.205 7.205 0 0 1 7.208 7.202 7.205 7.205 0 0 1-7.208 7.202Z"
          />
          <path
            strokeWidth={0.3}
            d="M9.17 10.647v14.38M16.367 17.837H1.973M4.082 22.921l10.177-10.169M4.082 12.752l10.177 10.17"
          />
          <path
            strokeWidth={0.349}
            d="M9.17 9.674C4.658 9.674 1 13.33 1 17.837S4.658 26 9.17 26s8.17-3.655 8.17-8.163-3.657-8.163-8.17-8.163Zm0 15.353a7.194 7.194 0 0 1-7.197-7.19 7.194 7.194 0 0 1 7.197-7.19 7.194 7.194 0 0 1 7.197 7.19c0 3.971-3.222 7.19-7.197 7.19Z"
          />
          <path
            strokeWidth={0.4}
            d="m16.811 1.073-2.85.486a.436.436 0 0 0-.356.503l.02.121c.041.238.267.397.504.357l2.85-.486a.436.436 0 0 0 .356-.503l-.02-.121a.437.437 0 0 0-.504-.357Z"
          />
        </g>
        <defs>
          <clipPath id="SykkelOutline_svg__a">
            <path fill="#fff" d="M0 0h42v27H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgSykkelOutline;
