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
const SvgFilmklapperOutline = forwardRef(
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
    const __srcH = 39;
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
        viewBox="0 0 42 39"
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
          d="M40.114 14.718 5.46 8.17l-.751 3.976 34.654 6.549z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m4.71 12.143 34.655 6.55-2.963 15.674a2.59 2.59 0 0 1-3.026 2.065L3.807 30.844a2.587 2.587 0 0 1-2.06-3.02l2.964-15.682z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m8.087 12.775-3.06-.58 3.851-3.387 3.06.578z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m5.006 12.193-.294-.056.67-3.546.415-.366 3.06.578zM11.166 13.356l-3.06-.578 3.852-3.39 3.06.58z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m14.248 13.939-3.062-.578 3.853-3.39 3.06.578z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m17.327 14.52-3.06-.578 3.851-3.388 3.06.578z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m20.408 15.102-3.061-.578 3.85-3.39 3.063.578z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m23.488 15.685-3.06-.578 3.851-3.39 3.06.578z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m26.567 16.266-3.06-.578 3.852-3.39 3.061.58z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m29.649 16.848-3.06-.578 3.851-3.39 3.06.578z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m32.728 17.43-3.06-.579 3.851-3.388 3.06.578z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m35.81 18.012-3.06-.578 3.85-3.39 3.06.58z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m38.889 18.594-3.06-.578 3.851-3.39.437.083-.636 3.364z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m40.7 3.26-35.263.503.058 4.045 35.263-.503z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m8.928 7.76-3.113.045 3.097-4.09 3.114-.045z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m5.795 7.806-.3.003-.052-3.61.334-.44 3.113-.043zM12.064 7.715l-3.116.045 3.098-4.09 3.115-.045z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m15.197 7.671-3.114.045 3.098-4.092 3.113-.043z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m18.332 7.626-3.113.045 3.097-4.09 3.113-.045z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m21.467 7.58-3.115.045 3.097-4.09 3.115-.044z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m24.6 7.537-3.113.045 3.097-4.09 3.114-.045z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m27.736 7.492-3.114.044 3.096-4.09 3.115-.044z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m30.87 7.448-3.114.043 3.097-4.09 3.113-.044z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m34.004 7.403-3.113.044 3.097-4.09 3.114-.044z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m37.14 7.357-3.116.045 3.097-4.09 3.116-.044z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.189}
          d="m40.273 7.314-3.114.043 3.098-4.09.443-.006.05 3.423z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="m8.712 17.701 24.899 4.704M8.018 22.827l24.898 4.703M14.325 24.02l-.912 4.828M26.08 26.24l-.912 4.828"
        />
      </svg>
    );
  },
);
export default SvgFilmklapperOutline;
