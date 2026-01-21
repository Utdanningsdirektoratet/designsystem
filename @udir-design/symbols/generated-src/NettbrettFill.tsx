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
const SvgNettbrettFill = forwardRef(
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
    const __srcH = 32;
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
        viewBox="0 0 42 32"
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
          clipPath="url(#NettbrettFill_svg__a)"
        >
          <path
            fill="#303030"
            d="M37.75 26.612H4.889a1.53 1.53 0 0 1-.98-.388 1.52 1.52 0 0 1-.484-.936L1.01 2.325a1.15 1.15 0 0 1 .29-.934 1.15 1.15 0 0 1 .894-.39h32.863c.361.008.709.145.98.387.268.245.44.578.484.937l2.413 22.963a1.17 1.17 0 0 1-.286.937q-.17.188-.406.29a1.2 1.2 0 0 1-.492.097Z"
          />
          <path
            fill="#BED5E8"
            d="M38.15 25.098 36.32 7.697l-.545-5.182a.92.92 0 0 0-.294-.572.94.94 0 0 0-.599-.236H2.522a.71.71 0 0 0-.697.504.7.7 0 0 0-.026.304l.545 5.182 1.83 17.401a.92.92 0 0 0 .295.572c.165.148.375.23.597.236h32.361a.72.72 0 0 0 .548-.236.74.74 0 0 0 .175-.572Z"
          />
          <path
            fill="#E5CEAE"
            strokeLinejoin="round"
            d="M41 24.649c-1.484-.895-5.332-2.689-6.03-3.624a3 3 0 0 1-.477-1.487c.003-.494-.32-3.877-.339-4.477-.015-.597-.18-1.384-1.426-2.11-1.25-.724-4.506-2.943-5.595-3.425-1.088-.486-1.12.665-.845.94.256.251 2.95 2.209 3.384 2.523q.007.003.01.012.003.012 0 .022c.002.004-.005.009-.008.013q-.01.008-.016.011c-.483.101-3.3.715-4.02 1.116-.787.438-.682 1.185-.613 2.044q.082 1.077.336 2.124c.183.872 1.35 1.068 1.521 1.091q.013.003.02.01c.002.004.007.01.007.014.06.246.572 2.444.78 3.435.22 1.047 1.035 1.808 1.629 2.288.207.166 4.326 3.586 6.68 5.753 0 0 4.204-2.483 5.002-6.273Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m26.905 19.425-.515-3.015"
          />
          <path
            fill="#76C69D"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m13.218 1.71.966 7.698-2.64-1.617-2.195 1.617-.965-7.697z"
          />
        </g>
        <defs>
          <clipPath id="NettbrettFill_svg__a">
            <path fill="#fff" d="M0 0h42v31.922H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgNettbrettFill;
