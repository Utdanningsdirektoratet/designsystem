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
const SvgBygning1Fill = forwardRef(
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
          clipPath="url(#Bygning1Fill_svg__a)"
        >
          <path
            fill="#ECDBC2"
            d="M9.38 22.277V5.545L21.023 1l11.596 4.545v16.732z"
          />
          <path
            fill="#F2E8DA"
            d="M32.62 22.277V7.77H41v14.507zM1 22.277V7.77h8.38v14.507z"
          />
          <path
            fill="#76C69D"
            strokeMiterlimit={10}
            d="M24.74 10.269c-.17-.98-1.108-1.603-2.182-1.35-1.013.238-1.558 1.43-1.558 1.43s-.546-1.192-1.558-1.43c-1.074-.253-2.012.37-2.182 1.35-.234 1.35.623 2.62 1.324 3.732.702 1.111 2.416 3.414 2.416 3.414s1.714-2.303 2.415-3.414 1.559-2.383 1.325-3.732Z"
          />
        </g>
        <defs>
          <clipPath id="Bygning1Fill_svg__a">
            <path fill="#fff" d="M0 0h42v23.277H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgBygning1Fill;
