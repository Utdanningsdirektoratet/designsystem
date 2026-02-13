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
const SvgTegneverktyOutline = forwardRef(
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
    const __srcH = 33;
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
        viewBox="0 0 42 33"
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
          d="m8.462 27.265-2.875-.847s-.01-.005-.009-.008l6.666-22.852 3.018.888-6.789 22.817s-.006.004-.011.002Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="m7.552 26.994-1.074-.316s-.003-.004-.001-.007l6.704-22.84 1.127.33-6.75 22.829q0 .002-.006.004Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m5.578 26.426.25 4.476 2.638-3.624s0-.011-.008-.013L5.59 26.42q-.01-.002-.013.006z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m5.732 28.99.096 1.912 1.118-1.555zM14.849 2.003c.575.17.906.775.736 1.352l-.32 1.088-.003.002-3.012-.887-.002-.003.321-1.091c.17-.575.773-.904 1.348-.734z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M33.018 14.211c-5.684-5.51-14.294-3.353-13.364 1.739 2.707 14.824-6.412 10.994-6.412 10.994"
        />
        <circle
          cx={0.345}
          cy={0.345}
          r={0.295}
          stroke="#303030"
          strokeWidth={0.1}
          transform="scale(-1 1)rotate(10.349 -94.643 -102.025)"
        />
        <circle
          cx={0.345}
          cy={0.345}
          r={0.295}
          stroke="#303030"
          strokeWidth={0.1}
          transform="scale(-1 1)rotate(10.349 -92.15 -176.237)"
        />
        <circle
          cx={0.345}
          cy={0.345}
          r={0.295}
          stroke="#303030"
          strokeWidth={0.1}
          transform="scale(-1 1)rotate(10.349 -152.834 -61.33)"
        />
        <path
          stroke="#303030"
          strokeWidth={0.1}
          d="m22.117 29.57-.238.393.392.237.237-.392zM18.64 10.779l-.237.391.392.237.237-.391zM26.504 7.179l-.237.391.392.237.237-.391z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="m32.883 14.089-6.095-6.482M22.13 29.614l-3.335-18.261"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m38.857 27.868-3.79.846-.258-1.159c-1.072-.351-2.64-1.428-2.953-2.953-.314-1.525 1.382-5.518 2.334-8.627 2.208 2.466 5.475 5.438 5.782 6.814s-.553 3.083-1.374 3.92zM34.29 16.294l1.385 6.266"
        />
        <circle
          cx={35.852}
          cy={23.343}
          r={0.812}
          stroke="#303030"
          strokeWidth={0.4}
          transform="rotate(-12.592 35.852 23.343)"
        />
      </svg>
    );
  },
);
export default SvgTegneverktyOutline;
