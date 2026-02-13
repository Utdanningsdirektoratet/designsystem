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
const SvgFargeskalaFill = forwardRef(
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
    const __srcW = 45;
    const __srcH = 54;
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
        viewBox="0 0 45 54"
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
          d="M19.589 7.662 29.93 9.907l-8.033 37.004-10.341-2.245z"
        />
        <path
          fill="#2F4960"
          stroke="#303030"
          strokeWidth={0.3}
          d="m13.825 39.009 8.352 1.813-1.037 4.773-8.351-1.813z"
        />
        <path
          fill="#6D889D"
          stroke="#303030"
          strokeWidth={0.3}
          d="m16.464 26.852 8.352 1.813-1.037 4.773-8.351-1.813z"
        />
        <path
          fill="#536D81"
          stroke="#303030"
          strokeWidth={0.3}
          d="m15.145 32.931 8.351 1.813-1.036 4.773-8.351-1.813z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.3}
          d="m17.784 20.774 8.351 1.813L25.1 27.36l-8.351-1.813z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.3}
          d="m19.103 14.696 8.351 1.813-1.036 4.773-8.351-1.813z"
        />
        <path
          fill="#EAEAEA"
          stroke="#303030"
          strokeWidth={0.4}
          d="m18.836 8.278 10.455-1.636 5.854 37.41-10.454 1.637z"
        />
        <path
          fill="#112E1F"
          stroke="#303030"
          strokeWidth={0.3}
          d="m24.767 39.594 8.443-1.321.755 4.825-8.443 1.321z"
        />
        <path
          fill="#5BA27E"
          stroke="#303030"
          strokeWidth={0.3}
          d="m22.843 27.303 8.443-1.321.755 4.825-8.443 1.321z"
        />
        <path
          fill="#254B38"
          stroke="#303030"
          strokeWidth={0.3}
          d="m23.805 33.449 8.443-1.321.755 4.825-8.443 1.321z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.3}
          d="m21.881 21.158 8.443-1.321.755 4.825-8.443 1.321z"
        />
        <path
          fill="#9BD8B9"
          stroke="#303030"
          strokeWidth={0.3}
          d="m20.92 15.013 8.443-1.321.755 4.825-8.443 1.321z"
        />
        <circle
          cx={20.488}
          cy={9.425}
          r={0.692}
          fill="#303030"
          transform="rotate(.38 20.488 9.425)"
        />
      </svg>
    );
  },
);
export default SvgFargeskalaFill;
