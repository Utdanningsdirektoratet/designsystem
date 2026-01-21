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
const SvgPuslespill2Outline = forwardRef(
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
    const __srcH = 42;
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
        viewBox="0 0 42 42"
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
          clipPath="url(#Puslespill2Outline_svg__a)"
        >
          <path d="m32.996 21.421-3.555-1.844s-1.328-.7-1.57-.304c-.41.678.081.93.2 1.393.12.461.021 1.658-1.305 2.113-1.395.478-2.607-.743-2.83-1.206-.341-.707-.14-2.094.85-2.554.553-.257 1.047-.198 1.037-.73-.011-.633-1.325-1.15-2.037-1.472-.577-.261-4.076-1.664-4.076-1.664l1.874-3.702s1.34-2.472.863-2.88c-.57-.49-1.082-.265-1.418-.062-.618.373-1.612.005-2.031-.812-.396-.769-.255-1.345.366-2.314.619-.97 1.527-1.147 2.203-.842.578.26.735.59.977 1.259s.882 1.047 1.387.745c.506-.302.76-1.032 1.064-1.634C25.217 4.473 26.886 1 26.886 1L40.54 7.45l-6.777 14.285zM1.0000000000000018 25.647v15.126l15.71.073M32.343 40.804l-15.634.04v-5.212s.093-1.148-.756-1.364c-.73-.185-1.092.223-1.307.55-.399.602-1.454.692-2.185.134-.688-.526-.807-1.107-.664-2.247s.886-1.688 1.63-1.701c.634-.012.917.218 1.424.72.506.5 1.246.57 1.573.08.327-.488.242-1.256.259-1.93.012-.49.132-4.291.132-4.291l5.46-.05s1.404.017 1.198.443c-.14.29-.534.704-.762 1.064-.25.393-.238 1.135-.065 1.563.388.962 1.048 1.234 1.851 1.28.742.042 1.62-.15 2.179-.824.658-.794.372-1.614.065-2.062-.308-.448-.996-.914-.61-1.193.427-.31 2.087-.28 2.496-.28s3.717.012 3.717.012L32.343 41zM17.208 9.75 1 9.71v15.936h5.252s1.547.002 1.34-.424c-.142-.29-.595-.508-.823-.868-.248-.392-.528-1.064-.099-2.009.348-.769 1.333-.987 2.216-.967s1.458.224 2.008 1.198c.493.874.031 1.555-.39 1.883-.42.327-1.103.67-.772 1.012.447.464 7.082.112 7.082.112V19.77s.034-1.04-.358-1.302c-.31-.208-.735-.105-.984.286-.489.77-1.836.957-2.683.25-.725-.605-.883-3.257.916-3.781 1.046-.304 1.954.963 2.537.937.582-.026.774-.566.791-1.013.072-1.81-.01-5.397-.01-5.397z" />
        </g>
        <defs>
          <clipPath id="Puslespill2Outline_svg__a">
            <path fill="#fff" d="M0 0h41.54v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgPuslespill2Outline;
