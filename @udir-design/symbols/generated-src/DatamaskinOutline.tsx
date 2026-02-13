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
const SvgDatamaskinOutline = forwardRef(
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
        <g stroke="#303030" clipPath="url(#DatamaskinOutline_svg__a)">
          <path
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M34.006 1H7.936c-.672 0-1.217.545-1.217 1.218v16.337c0 .673.545 1.218 1.218 1.218h26.07c.672 0 1.217-.545 1.217-1.218V2.218c0-.673-.545-1.218-1.218-1.218Z"
          />
          <path
            strokeMiterlimit={10}
            strokeWidth={0.2}
            d="M33.406 1.609H8.536c-.672 0-1.217.545-1.217 1.218v14.222c0 .672.545 1.218 1.218 1.218h24.87c.672 0 1.217-.546 1.217-1.218V2.827c0-.673-.545-1.218-1.218-1.218Z"
          />
          <path
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M41 24.895v.438c0 .162-.13.293-.292.294L1.294 25.7A.293.293 0 0 1 1 25.41v-.438c0-.092.043-.178.116-.234l5.162-3.905.028-.02c.289-.177.62-.272.96-.274l27.455-.051c.335 0 .664.092.95.267q.015.008.029.018l5.183 3.889a.29.29 0 0 1 .117.233z"
          />
          <path strokeWidth={0.2} d="M2.12 24.87h37.757" />
        </g>
        <defs>
          <clipPath id="DatamaskinOutline_svg__a">
            <path fill="#fff" d="M0 0h42v26.701H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgDatamaskinOutline;
