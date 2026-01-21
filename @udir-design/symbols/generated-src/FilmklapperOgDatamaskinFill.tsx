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
const SvgFilmklapperOgDatamaskinFill = forwardRef(
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
    const __srcH = 30;
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
        viewBox="0 0 42 30"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M31.662 2.545 7.993 5.767a1.116 1.116 0 0 0-.955 1.256l2.018 14.833c.083.61.646 1.038 1.257.955l23.669-3.221a1.116 1.116 0 0 0 .955-1.256L32.92 3.5a1.116 1.116 0 0 0-1.257-.956Z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M31.193 3.172 8.613 6.245a1.116 1.116 0 0 0-.955 1.256l1.758 12.913c.083.61.645 1.038 1.256.955l22.58-3.073a1.116 1.116 0 0 0 .955-1.256L32.449 4.128a1.116 1.116 0 0 0-1.256-.956Z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m40.944 23.414.053.398a.27.27 0 0 1-.23.302l-35.784 4.87a.27.27 0 0 1-.302-.23l-.054-.397a.27.27 0 0 1 .077-.227l4.212-4.175.024-.021c.24-.197.53-.324.837-.366l14.541-1.979 7.381-1.004 3.006-.41c.304-.04.614.003.896.127l.028.014 5.18 2.9a.27.27 0 0 1 .135.197z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m5.477 28.183 34.6-4.708"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M21.132 7.104 2.52 4.73l-.272 2.135 18.611 2.374z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M2.248 6.864 20.86 9.24l-1.074 8.418a1.38 1.38 0 0 1-1.542 1.193l-15.88-2.026a1.376 1.376 0 0 1-1.19-1.539l1.074-8.422z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m4.061 7.092-1.643-.21L4.355 4.96 6 5.17z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m2.407 6.88-.158-.02.243-1.904.208-.207 1.644.209zM5.715 7.302l-1.643-.209L6.009 5.17l1.644.21z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m7.37 7.514-1.644-.21 1.938-1.922 1.643.21z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m9.024 7.724-1.643-.21 1.937-1.921 1.643.21z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m10.679 7.936-1.644-.21 1.937-1.923 1.644.21z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m12.333 8.147-1.643-.21 1.937-1.922 1.643.209z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m13.987 8.357-1.644-.21 1.938-1.922 1.644.21z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m15.642 8.568-1.644-.209 1.938-1.923 1.643.21z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m17.296 8.78-1.644-.21 1.937-1.923 1.644.21z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m18.95 8.99-1.643-.21 1.937-1.922 1.643.21z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m20.604 9.201-1.643-.21 1.937-1.922.235.03-.231 1.806z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M21.078 1 2.368 2.39l.159 2.147 18.71-1.39z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m4.349 4.402-1.652.123 1.514-2.27 1.652-.124z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m2.686 4.526-.16.012-.142-1.916.164-.245L4.2 2.255zM6.012 4.278l-1.653.123 1.515-2.27 1.653-.123z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m7.675 4.155-1.652.123 1.514-2.271 1.652-.122z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m9.338 4.031-1.652.123 1.515-2.27 1.652-.123z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m11.002 3.907-1.653.123 1.514-2.27 1.653-.123z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m12.664 3.784-1.652.123 1.515-2.27 1.652-.123z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m14.328 3.66-1.652.123 1.513-2.27 1.653-.123z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m15.991 3.538-1.653.122 1.515-2.27 1.652-.124z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m17.654 3.414-1.652.123 1.514-2.271 1.652-.123z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m19.317 3.29-1.653.123 1.515-2.27 1.653-.124z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.1}
          d="m20.98 3.167-1.652.122 1.514-2.27.236-.018.135 1.816z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m4.55 9.688 13.373 1.705M4.345 12.432l13.372 1.705M7.732 12.865l-.33 2.593M14.045 13.67l-.33 2.592"
        />
      </svg>
    );
  },
);
export default SvgFilmklapperOgDatamaskinFill;
