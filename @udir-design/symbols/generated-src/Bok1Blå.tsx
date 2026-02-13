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
const SvgBok1Bl = forwardRef(
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
    const __srcW = 36;
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
        viewBox="0 0 36 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          d="M11.28 33.296 2.901 3.966 25.201 1l9.068 27.364z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M1.012 5.715c0-1.271 1.389-1.667 1.89-1.75l8.377 29.33c-1.295.28-2.416 1.065-2.416 2.404v4.928L1.013 9.443c-.028-.668 0-2.395 0-3.728Z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M10.79 39.986c-1.448.389-1.796.2-1.924-.73v1.327s.09.517.837.4c.748-.119 24.489-5.618 24.489-5.618l-1.15-5.202v4.69c-7.342 1.668-20.777 4.736-22.253 5.133Z"
        />
        <path
          fill="#F2E8DA"
          stroke="#303030"
          strokeWidth={0.4}
          d="M33.047 34.814v-6.197c-6.47 1.404-20.407 4.382-21.747 4.676-1.614.353-2.43 1.336-2.43 2.28v3.346c0 1.11.416 1.34 1.074 1.25z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="m10.435 35.51 20.188-4.487m-13.092 4.486 11.124-2.472M13.273 37.89l11.537-2.656"
        />
      </svg>
    );
  },
);
export default SvgBok1Bl;
