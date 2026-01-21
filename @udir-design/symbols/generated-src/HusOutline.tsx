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
const SvgHusOutline = forwardRef(
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
    const __srcH = 30;
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
        viewBox="0 0 42 30"
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
          strokeWidth={0.4}
          clipPath="url(#HusOutline_svg__a)"
        >
          <path d="M39.505 9.943H2.492v19.02h37.013zM41 9.935H1l5.973-6.044h28.052z" />
          <path d="M13.747 16.447H7.048v12.51h6.7zM33.725 16.447h-4.87v6.725h4.87zM31.29 1h-2.434v2.891h2.435zM24.548 16.447h-4.87v6.725h4.87zM22.113 16.447v6.725M31.29 16.447v6.725M28.856 19.81h4.869M19.679 19.81h4.869" />
        </g>
        <defs>
          <clipPath id="HusOutline_svg__a">
            <path fill="#fff" d="M0 0h42v29.964H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgHusOutline;
