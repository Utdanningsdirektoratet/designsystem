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
const SvgBygning2Fill = forwardRef(
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
    const __srcH = 24;
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
        viewBox="0 0 42 24"
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
          clipPath="url(#Bygning2Fill_svg__a)"
        >
          <path
            fill="#D3E6F6"
            d="M9.38 22.277V5.545L21.023 1l11.596 4.545v16.732z"
          />
          <path
            fill="#BED5E8"
            d="M32.62 22.277V7.77H41v14.507zM1 22.277V7.77h8.38v14.507z"
          />
          <path
            fill="#76C69D"
            d="M17.246 22.277v-8.104H21v8.104zM21 22.277v-8.104h3.753v8.104z"
          />
        </g>
        <defs>
          <clipPath id="Bygning2Fill_svg__a">
            <path fill="#fff" d="M0 0h42v23.277H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgBygning2Fill;
