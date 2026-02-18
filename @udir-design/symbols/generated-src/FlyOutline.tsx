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
const SvgFlyOutline = forwardRef(
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
    const __srcW = 37;
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
        viewBox="0 0 37 42"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M5.869 3.664c-.544.859.231 2.346 1.73 3.321l10.025 6.52.373-1.954 1.595-1.158L9.568 3.874c-1.5-.975-3.156-1.069-3.7-.21Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m17.997 11.551-.953 4.99 1.868 1.215 1.058-4.922 3.972-3.026-1.869-1.215zM18.716 1l-8.12 3.543 4.268 2.775L20.9 2.421zM8.628 7.654l.208 8.959 2.185 1.421 1.874-7.605zM21.681 13.928s.102.09.288.237"
        />
        <path
          stroke="#303030"
          strokeDasharray="0.75 0.75"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M22.572 14.613c1.163.815 3.31 2.054 5.5 1.943 8.946-.451 9.393 10.697 5.898 14.61-4.914 5.503-12.187 5.09-14.745 5.216-7.386.362-12.519-5.798-8.298-8.166 4.222-2.368 7.652 1.535 5.543 5.68C14.527 37.712 5.174 40.925 1.743 41"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1.368 40.994A3 3 0 0 1 1 40.949"
        />
      </svg>
    );
  },
);
export default SvgFlyOutline;
