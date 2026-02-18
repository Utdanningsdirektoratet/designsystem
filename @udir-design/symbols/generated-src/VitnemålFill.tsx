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
const SvgVitnemlFill = forwardRef(
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
    const __srcH = 40;
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
        viewBox="0 0 42 40"
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
          clipPath="url(#Vitnem\xE5lFill_svg__a)"
        >
          <path
            fill="#F2E8DA"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M35.134 9.339A8.34 8.34 0 0 0 26.793 1L1 1.015c4.368.265 5.963 3.89 5.963 8.324L6.96 33.647a5.287 5.287 0 0 0 5.288 5.288h22.874q.009-.001.01-.01z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M30.296 27.835H11.288M30.296 31.185H11.288M30.296 24.485H11.288"
          />
          <path
            fill="#E5CEAE"
            strokeMiterlimit={10}
            d="M12.249 38.945a.01.01 0 0 1-.01-.01.01.01 0 0 1 .01-.01 5.283 5.283 0 0 0 5.277-5.278v-3.545q0-.01.01-.01H40.99q.009 0 .01.01v3.545a5.303 5.303 0 0 1-5.298 5.297z"
          />
          <path
            fill="#76C69D"
            d="M13.653 13.077c-.261.392-1.826 2.943-1.92 7.507a.067.067 0 0 0 .104.057l1.437-1.002a.07.07 0 0 1 .085.006l1.32 1.312c.043.042.115.012.113-.048-.023-.826-.028-4.526 1.641-6.764a.082.082 0 0 0-.036-.126l-2.647-.976a.085.085 0 0 0-.097.034Z"
          />
          <path
            fill="#76C69D"
            d="M16.144 14.783c.186.495 1.703 4.26 4.902 5.012q.017.002.022-.015l.126-1.5q0-.008.009-.013l1.293-.664c.013-.007.013-.025 0-.03-.356-.141-3.432-1.44-3.934-4.088a.066.066 0 0 0-.096-.047L16.174 14.7a.07.07 0 0 0-.03.082Z"
          />
          <path
            fill="#BED5E8"
            d="M16.094 6.736a4.069 4.069 0 1 0 0 8.137 4.069 4.069 0 1 0 0-8.137Z"
          />
        </g>
        <defs>
          <clipPath id="Vitnem\xE5lFill_svg__a">
            <path fill="#fff" d="M0 0h42v39.945H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgVitnemlFill;
