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
const SvgBlomstOutline = forwardRef(
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
    const __srcW = 33;
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
        viewBox="0 0 33 42"
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
          clipPath="url(#BlomstOutline_svg__a)"
        >
          <path
            strokeWidth={0.4}
            d="M2.139 40.667s9.516-22.917 14.98-25.892c0 0-4.816 2.75-14.227 26.225l-.753-.33z"
          />
          <path
            strokeWidth={0.4}
            d="M5.18 35.523s3.248.887 5.866.646c2.388-.22 1.9-2.711 4.941-2.782 0 0-.235-1.563-2.587-2.362-3.596-1.221-3.715-.07-5.08.707-2.151 1.227-3.14 3.791-3.14 3.791ZM6.263 31.329s-2.758-1.932-4.246-4.101C.66 25.25 2.888 24.035 1 21.648c0 0 1.353-.818 3.47.482 3.237 1.985 2.427 2.813 2.702 4.358.432 2.439-.907 4.839-.907 4.839zM24.397 3.558s2.958-4.011 4.653 1.431c0 0 4.88 1.95.65 4.718 0 0 4.806 2.442-.025 4.856 0 0 .086 4.626-4.35 2.125 0 0-.842 4.954-4.66 1.637 0 0-4.792 1.554-3.409-3.726 0 0-4.31 1.265-2.975-3.822 0 0-2.528-4.578 2.501-4.229 0 0-3.03-4.112 2.813-4.047 0 0 3.415-4 4.798 1.059z"
          />
          <path
            strokeWidth={0.207}
            d="M21.57 10.473a.428.428 0 1 0 0-.856.428.428 0 0 0 0 .856ZM22.438 11.744a.535.535 0 1 0 0-1.07.535.535 0 0 0 0 1.07ZM23.688 11.065a.434.434 0 1 0 0-.867.434.434 0 0 0 0 .867ZM22.874 9.987a.627.627 0 1 0 0-1.253.627.627 0 0 0 0 1.253ZM27.888 16.325c-2.713 1.299-3.455-4.688-3.455-4.688s6.488 3.235 3.455 4.688ZM30.72 12.474c-1.475 2.622-5.52-1.854-5.52-1.854s7.17-1.077 5.52 1.854ZM30.336 7.116c.47 2.971-5.48 1.97-5.48 1.97s4.955-5.291 5.48-1.97ZM27.458 3.302c2.09 2.163-3.355 4.76-3.355 4.76s1.018-7.178 3.355-4.76ZM22.03 1.993c2.965.5.122 5.822.122 5.822s-3.438-6.382-.123-5.822ZM17.497 3.506c2.715-1.294 3.443 4.695 3.443 4.695s-6.48-3.25-3.443-4.695ZM14.623 8.106c1.324-2.702 5.616 1.538 5.616 1.538s-7.097 1.481-5.616-1.538ZM14.785 12.883c-.466-2.972 5.48-1.966 5.48-1.966s-4.958 5.287-5.48 1.966ZM18.175 17.356c-2.203-2.048 3.096-4.932 3.096-4.932s-.633 7.221-3.096 4.932ZM22.794 18.581c-2.98-.41-.298-5.814-.298-5.814s3.629 6.275.298 5.814Z"
          />
        </g>
        <defs>
          <clipPath id="BlomstOutline_svg__a">
            <path fill="#fff" d="M0 0h32.828v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgBlomstOutline;
