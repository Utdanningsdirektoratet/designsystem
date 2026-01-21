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
const SvgLinjalFill = forwardRef(
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
        viewBox="0 0 36 42"
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
          clipPath="url(#LinjalFill_svg__a)"
        >
          <path
            fill="#BED5E8"
            strokeWidth={0.4}
            d="M24.34 23.929 1 7.09 5.394 1l29.419 21.224s.003.01-.003.01z"
          />
          <path
            fill="#76C69D"
            strokeWidth={0.4}
            d="M15.194 36.607 24.34 23.93l10.451-1.692c.013-.002.022.013.014.023L21.285 41z"
          />
          <path
            strokeWidth={0.3}
            d="m10.678 6.884.984-1.363M7.022 5.274l1.471-2.039M13.36 9.846l1.47-2.039M26.035 18.99l1.47-2.038M20.466 39.022l10.17-14.098M29.691 20.6l.984-1.362M17.017 11.457 18 10.093M19.698 14.418l1.47-2.038M23.354 16.029l.984-1.363"
          />
        </g>
        <defs>
          <clipPath id="LinjalFill_svg__a">
            <path fill="#fff" d="M0 0h35.814v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgLinjalFill;
