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
const SvgBallongBrun = forwardRef(
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
    const __srcW = 15;
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
        viewBox="0 0 15 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M2.406 12.363c1.012 1.967 2.714 4.43 4.894 4.43 2.054 0 3.637-2.58 4.591-4.575s1.868-6.33.258-9.047C10.337.113 4.02.444 2.08 3.171.14 5.9 1.17 9.963 2.406 12.363Z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M6.048 17.616c.104-.215.7-.585.986-.744.222-.13.358-.077.51 0 .147.074.788.467.891.83.104.364-.406.165-.57.156-.165-.009-.355-.113-.831.07-.476.18-1.116-.044-.986-.312Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M7.378 17.847c.128 1.564.12 2.689 0 4.03-.151 1.679-1.234 5.352-.556 8.204S7.99 34.557 7.378 41"
        />
      </svg>
    );
  },
);
export default SvgBallongBrun;
