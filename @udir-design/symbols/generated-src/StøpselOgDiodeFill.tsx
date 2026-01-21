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
const SvgStpselOgDiodeFill = forwardRef(
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          clipPath="url(#St\xF8pselOgDiodeFill_svg__a)"
        >
          <path
            fill="#76C69D"
            d="m31.563 15.258.667-7.838a3.246 3.246 0 0 0-2.956-3.508 3.246 3.246 0 0 0-3.508 2.956l-.667 7.838 6.464.55z"
          />
          <path
            fill="#E5CEAE"
            d="m9.178 24.766.85 4.248c.192.967 2.374 1.347 4.872.847s4.366-1.687 4.174-2.655l-.85-4.248z"
          />
          <path
            fill="#76C69D"
            d="m32.093 15.3-7.52-.64a.86.86 0 0 0-.145 1.714l7.52.64a.86.86 0 0 0 .145-1.715Z"
          />
          <path
            fill="#7F99AE"
            d="m15.461 23.511-.696-3.483a.28.28 0 0 1 .22-.33l.532-.106a.28.28 0 0 1 .33.22l.696 3.483-1.08.216zM10.86 24.431l-.695-3.483a.28.28 0 0 1 .22-.33l.531-.106a.28.28 0 0 1 .33.22l.696 3.483-1.08.216z"
          />
          <path d="M21.493 40.702s2.659-8.243 4.459-24.197M30.917 41s-.846-10.372-.56-24.119" />
          <path
            fill="#E5CEAE"
            d="M15.753 29.654s-.424.11-.755.188c-.353.08-.72.126-.72.126s1.47 5.21-.759 7.799C10.74 41 2.921 31.231 2.691 26.564c-.207-4.202 1.001-5.52 12.304-16.657C19.93 5.047 19.673 1 19.673 1h-1.582s.326 3.547-4.377 8.28C8.436 14.596-.26 21.64 1.154 27.747c1.471 6.364 10.36 16.652 13.97 9.92 1.623-3.028.63-8.013.63-8.013Z"
          />
        </g>
        <defs>
          <clipPath id="St\xF8pselOgDiodeFill_svg__a">
            <path fill="#fff" d="M0 0h33.95v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgStpselOgDiodeFill;
