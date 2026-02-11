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
const SvgTrehjulsykkelOutline = forwardRef(
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
    const __srcH = 36;
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
        viewBox="0 0 42 36"
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
          clipPath="url(#TrehjulsykkelOutline_svg__a)"
        >
          <path d="m14.674 1.12-5.9 1.006a.715.715 0 0 0-.584.826l.066.39c.067.389.436.65.825.584l5.9-1.006a.715.715 0 0 0 .585-.826l-.067-.39a.715.715 0 0 0-.825-.584Z" />
          <path
            strokeLinecap="round"
            d="M34.61 7.956c-.147 1.796-2.787 1.563-2.787 1.563l-9.628-.792s-.55-.037-.506-.58c.037-.451.355-.572.539-.556.183.016 7.67-.19 9.001-.219 2.012-.043 2.406-1.3 2.9-1.789.35-.345.565 1.36.481 2.375z"
          />
          <path d="M9.598 27.732a2.485 2.485 0 1 0 0-4.97 2.485 2.485 0 0 0 0 4.97ZM8.012 23.336l-1.876-2.259" />
          <path strokeLinecap="round" d="m5.48 21.624 1.316-1.093" />
          <path d="m11.186 27.16 1.874 2.259" />
          <path strokeLinecap="round" d="m13.72 28.872-1.317 1.093" />
          <path d="M9.598 16.82A8.6 8.6 0 0 0 1 25.42c0 4.749 3.85 8.598 8.598 8.598 4.75 0 8.598-3.85 8.598-8.598a8.6 8.6 0 0 0-8.598-8.599Zm0 15.537a6.939 6.939 0 1 1 0-13.877 6.939 6.939 0 0 1 0 13.877ZM34.628 21.362a6.373 6.373 0 1 0 .001 12.745 6.373 6.373 0 0 0-.001-12.745Zm0 10.939a4.567 4.567 0 1 1 0-9.134 4.567 4.567 0 0 1 0 9.134Z" />
          <path d="M33.282 23.358c.957 1.878 1.948 3.802 1.948 3.802.546 1.13-.672 1.868-1.358 1.13-.547-.591-1.346-1.464-2.313-2.534l-.604-.668M10.172 16.82l.345-1.786s.546-5.286-.666-11.238l1.95-.334c1.972 7.496 2.264 8.706 2.264 8.706l11.698-.366a.89.89 0 0 0 .963-.829l.121-1.864 2.352.193-.257 5.054c-.018.284 1.94 4.252 3.518 7.382M12.52 19.076l-2.131 6.173c-.498 1.186-1.982.643-1.751-.483L9.85 18.48" />
          <path d="M29.712 23.68c-2.3-2.588-3.413-3.862-4.727-4.837-.514-.382-2.362-1.715-5.12-2.76a22.1 22.1 0 0 0-5.847-1.347l-.969 2.805" />
        </g>
        <defs>
          <clipPath id="TrehjulsykkelOutline_svg__a">
            <path fill="#fff" d="M0 0h42v35.106H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgTrehjulsykkelOutline;
