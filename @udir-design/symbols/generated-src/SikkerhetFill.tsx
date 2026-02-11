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
const SvgSikkerhetFill = forwardRef(
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
        <g
          stroke="#303030"
          strokeWidth={0.4}
          clipPath="url(#SikkerhetFill_svg__a)"
        >
          <path
            fill="#76C69D"
            d="M34.477 4.68c-9.35.6-14.735-2.58-16.155-3.56a.67.67 0 0 0-.761 0c-1.42.98-6.805 4.159-16.155 3.56A.38.38 0 0 0 1 5.058v19.499C1 37.98 16.789 40.814 17.882 40.995q.059.01.118 0c1.093-.179 16.881-3.013 16.881-16.438v-19.5a.38.38 0 0 0-.404-.377Z"
          />
          <path
            fill="#E5CEAE"
            d="M23.843 21.451h-2.22v-5.615a3.56 3.56 0 0 0-3.556-3.556 3.56 3.56 0 0 0-3.556 3.556v5.615h-2.22v-5.615a5.78 5.78 0 0 1 5.776-5.776 5.78 5.78 0 0 1 5.776 5.776z"
          />
          <path
            fill="#BED5E8"
            d="M26.3 29.311H9.987a1.19 1.19 0 0 1-1.191-1.19v-8.185c0-.657.532-1.19 1.19-1.19H26.3c.657 0 1.192.532 1.192 1.19v8.185c0 .656-.535 1.19-1.192 1.19Z"
          />
          <path
            fill="#A9C0D3"
            d="M18.798 23.933a1.86 1.86 0 0 0 1.17-2.112 1.865 1.865 0 1 0-2.468 2.117c.04.015.057.06.038.096l-1.145 2.094a.503.503 0 0 0 .441.744h2.599c.38 0 .622-.405.445-.74l-1.118-2.106c-.017-.032 0-.078.038-.093Z"
          />
        </g>
        <defs>
          <clipPath id="SikkerhetFill_svg__a">
            <path fill="#fff" d="M0 0h35.881v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgSikkerhetFill;
