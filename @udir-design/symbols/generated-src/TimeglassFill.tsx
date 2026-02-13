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
const SvgTimeglassFill = forwardRef(
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
          fill="#EAEAEA"
          stroke="#303030"
          strokeWidth={0.4}
          d="M17.028 19.346c4.522-4.75 7.037-10.377 8.374-16.606 0 0-5.12-.138-10.886-.323L3.63 2.74c1.337 6.229 3.873 11.856 8.394 16.606.714.715.824 2.589 0 3.413-4.521 4.753-7.057 10.38-8.394 16.606l10.886.323c5.766-.185 10.886-.323 10.886-.323-1.337-6.226-3.852-11.853-8.374-16.606-.78-.78-.78-2.63 0-3.413Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M8.27 11.873q-.005-.004-.003-.011 0-.007.002-.015c.005-.001.007-.006.012-.006q.008-.003.014-.002l10.341 2.563q.005.003.009.007c.002 0 .005.005.006.006 0 .006.003.007.003.012q-.003.004-.004.01c-1.37 2.464-1.375 2.519-3.123 4.632a1.26 1.26 0 0 0-.276.785v10.378c.004.184.048.367.126.533.079.169.194.317.335.436 3.445 2.755 6.157 5.6 8.912 8.494a.02.02 0 0 1 .007.011q0 .008-.003.014-.001.006-.007.01l-.013.004H3.5l-.014-.004-.01-.01q-.001-.007 0-.014 0-.007.007-.011c2.938-2.847 5.973-5.646 9.829-8.31a1.261 1.261 0 0 0 .554-1.014V19.668a1.1 1.1 0 0 0-.101-.508 1.15 1.15 0 0 0-.312-.415h-.003c-1.97-1.88-3.667-4.4-5.182-6.873Z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M26.613 38.166H2.417a1.417 1.417 0 1 0 0 2.834h24.196a1.417 1.417 0 1 0 0-2.834ZM26.613 1H2.417a1.417 1.417 0 1 0 0 2.834h24.196a1.417 1.417 0 0 0 0-2.834Z"
        />
      </svg>
    );
  },
);
export default SvgTimeglassFill;
