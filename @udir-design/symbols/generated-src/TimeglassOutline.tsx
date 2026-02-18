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
const SvgTimeglassOutline = forwardRef(
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
    const __srcW = 30;
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
        viewBox="0 0 30 42"
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
          d="M25.128 38.166c-1.396-5.75-3.87-10.961-8.1-15.407-.78-.78-.78-2.63 0-3.413 4.256-4.47 6.734-9.718 8.125-15.512M3.88 3.834c1.393 5.794 3.89 11.041 8.144 15.512.714.715.824 2.589 0 3.413-4.229 4.446-6.72 9.657-8.12 15.407"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M5.08 38.166c2.459-2.32 5.07-4.596 8.233-6.782a1.261 1.261 0 0 0 .554-1.014v-10.7a1.1 1.1 0 0 0-.101-.509 1.15 1.15 0 0 0-.312-.415h-.003c-1.97-1.88-3.667-4.4-5.182-6.873q-.004-.004-.002-.011 0-.007.002-.015c.005-.001.007-.006.012-.006q.008-.003.014-.002l10.341 2.563q.005.003.009.007c.002 0 .005.005.006.006 0 .006.003.007.003.012q-.003.004-.004.01c-1.37 2.464-1.375 2.519-3.123 4.632a1.26 1.26 0 0 0-.276.785v10.378c.004.184.048.367.126.533.079.169.194.317.335.436 2.837 2.269 5.176 4.598 7.451 6.965M2.417 38.166h24.196a1.417 1.417 0 1 1 0 2.834H2.417a1.417 1.417 0 0 1 0-2.834ZM3.88 3.834H2.416a1.417 1.417 0 0 1 0-2.834h24.196a1.417 1.417 0 0 1 0 2.834z"
        />
      </svg>
    );
  },
);
export default SvgTimeglassOutline;
