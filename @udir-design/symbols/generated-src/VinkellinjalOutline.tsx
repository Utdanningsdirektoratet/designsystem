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
const SvgVinkellinjalOutline = forwardRef(
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
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m40.755 1.21-7.858 38.542L1.422 1.2zM14.106 7.806l14.857 18.197.278.34.074-.433 2.99-17.604.039-.226-.23-.008-17.846-.592-.44-.015z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.25}
          d="m12.542 2.878.001-1.584M33.492 28.538l1.552.316M11.265 11.017l-1.228 1M8.857 3.664v-2.37M31.985 31.991l2.322.475M9.548 7.663 7.71 9.159M28.193 30.5l-1.838 1.497M16.23 3.664l-.002-2.371M33.46 24.769l2.323.475M14.202 13.38l-1.84 1.496M30.971 3.663v-2.37M36.41 10.325l2.323.474M23.508 24.813l-1.839 1.497M34.656 2.877V1.293M37.917 6.872l1.552.316M25.224 28.167l-1.228 1M19.914 2.878V1.294M34.967 21.315l1.552.317M15.919 16.734l-1.229 1M23.6 3.663v-2.37M34.935 17.547l2.323.474M18.855 19.096l-1.839 1.497M27.285 2.878V1.294M36.442 14.094l1.552.316M20.572 22.45l-1.228 1"
        />
      </svg>
    );
  },
);
export default SvgVinkellinjalOutline;
