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
const SvgBlyantFill = forwardRef(
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
    const __srcW = 23;
    const __srcH = 42;
    const __isWide = false;
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
        viewBox="0 0 23 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#5BA27E"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m6.284 35.75-3.796-1.727s-.012-.01-.01-.014L16.123 3.82l3.985 1.814L6.3 35.749s-.01.005-.017.002Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="m5.083 35.2-1.417-.646s-.004-.006-.002-.01L17.362 4.379l1.488.677-13.758 30.14s-.005.005-.009.004Z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m2.473 34.032-.528 6.217 4.342-4.48s.002-.015-.008-.02l-3.788-1.724c-.008-.003-.018 0-.02.006z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m2.185 37.596-.24 2.653 1.844-1.925z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M20.016 2.186a1.516 1.516 0 0 1 .751 2.007l-.654 1.437-.005.002-3.977-1.81-.002-.005.656-1.44a1.51 1.51 0 0 1 2-.75z"
        />
      </svg>
    );
  },
);
export default SvgBlyantFill;
