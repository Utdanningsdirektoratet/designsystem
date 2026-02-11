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
const SvgSykkelFill = forwardRef(
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
          clipPath="url(#SykkelFill_svg__a)"
        >
          <path
            strokeWidth={0.4}
            d="M20.504 19.782a2.323 2.323 0 1 0-2.325-2.322 2.323 2.323 0 0 0 2.325 2.322Z"
          />
          <path
            fill="#E5CEAE"
            strokeLinecap="round"
            strokeWidth={0.4}
            d="M29.47 2.108c0 1.207-1.127 1.196-1.127 1.196H24.23s-.235.006-.235-.36c0-.303.13-.4.208-.4.079 0 3.25-.527 3.812-.641.479-.097.854-.347 1.047-.7.136-.25.409.223.409.905Z"
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
            fill="#BED5E8"
            strokeWidth={0.4}
            d="M10.248 4.162v3.1s2.629-.194 2.629-1.55-2.629-1.55-2.629-1.55Z"
          />
          <path
            fill="#76C69D"
            strokeWidth={0.3}
            d="m27.352 4.421-.028-1.117h-1.127l.028 1.201.872 1.9-11.293 2.638L14.429 6.9l1.209-3.091c-.399-1.828-.306-2.002-.947-2.002-.686 0-.426.07-.064 1.936L13.62 6.248l-.167.415L8.65 17.837h1.042l4.23-9.895 6.321 9.895 12.587-.015.598.038zM20.689 16.94l-4.322-7.006 11.155-2.62 4.462 9.636z"
          />
          <path
            strokeWidth={0.3}
            d="M32.83 9.674V26M41 17.837H24.66M27.052 23.61l11.555-11.545M27.052 12.065 38.607 23.61"
          />
          <path
            fill="#7F99AE"
            strokeWidth={0.4}
            d="M32.83 9.674c-4.513 0-8.17 3.655-8.17 8.163S28.316 26 32.83 26c4.512 0 8.17-3.655 8.17-8.163s-3.658-8.163-8.17-8.163Zm0 15.365a7.205 7.205 0 0 1-7.209-7.202 7.205 7.205 0 0 1 7.209-7.202 7.205 7.205 0 0 1 7.208 7.202 7.205 7.205 0 0 1-7.208 7.202Z"
          />
          <path
            strokeWidth={0.3}
            d="M9.17 9.674V26M17.34 17.837H1M3.393 23.61l11.555-11.545M3.393 12.065 14.948 23.61"
          />
          <path
            fill="#7F99AE"
            strokeWidth={0.4}
            d="M9.17 9.674C4.658 9.674 1 13.33 1 17.837S4.658 26 9.17 26s8.17-3.655 8.17-8.163-3.657-8.163-8.17-8.163Zm0 15.353a7.194 7.194 0 0 1-7.197-7.19c0-3.97 3.223-7.19 7.197-7.19a7.194 7.194 0 0 1 7.197 7.19 7.194 7.194 0 0 1-7.197 7.19Z"
          />
          <path
            fill="#E5CEAE"
            strokeWidth={0.4}
            d="m16.811 1.073-2.85.486a.436.436 0 0 0-.356.503l.02.121c.041.238.267.397.504.357l2.85-.486a.436.436 0 0 0 .356-.503l-.02-.121a.436.436 0 0 0-.504-.357Z"
          />
        </g>
        <defs>
          <clipPath id="SykkelFill_svg__a">
            <path fill="#fff" d="M0 0h42v27H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgSykkelFill;
