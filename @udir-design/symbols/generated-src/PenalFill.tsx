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
const SvgPenalFill = forwardRef(
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
    const __srcW = 31;
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
        viewBox="0 0 31 42"
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
          d="m7.295 32.429 3.532.77q.01.002.019.006c.004.008.012.012.016.02q.005.006.004.02c.003.007 0 .015 0 .023l-1.376 4.13c-.634.692-.962.87-1.731.186l-2.346-3.47a.06.06 0 0 1-.012-.04q.004-.016.02-.03z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M10.862 33.19c.004.011 0 .027-.008.038a.1.1 0 0 1-.034.02l-5.364.865c-.012.004-.028 0-.039-.007l-.012-.016q-.007-.009-.008-.02L1.943 12.08c.564-4.46 4.463-3.75 5.468-.862z"
        />
        <path
          fill="#EAEAEA"
          stroke="#303030"
          strokeWidth={0.4}
          d="m7.759 37.584 1.1 1.623c.013.015.028.015.032-.008l.599-1.801a2.2 2.2 0 0 0-1.731.186Z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeWidth={0.4}
          d="m2.044 7.487 3.342-.552 1.453.668.572 3.614-5.468.862-.568-3.61z"
        />
        <path
          fill="#FBF3E8"
          stroke="#303030"
          strokeWidth={0.4}
          d="m6.839 7.603-.066-.416-.266-1.724a2.753 2.753 0 0 0-1.11-1.808 2.78 2.78 0 0 0-2.059-.496c-.36.055-.703.182-1.017.376a2.75 2.75 0 0 0-1.244 1.712c-.085.355-.1.722-.042 1.081l.274 1.72.066.421z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="m10.634 9.915-3.529-.773a.1.1 0 0 1-.023-.008l-.011-.015q-.007-.012-.008-.024-.001-.007.004-.019l1.372-4.131c.633-.696.962-.874 1.731-.186l2.35 3.47c.008.009.01.024.008.035q-.002.018-.016.031z"
        />
        <path
          fill="#D3E6F6"
          stroke="#303030"
          strokeWidth={0.4}
          d="M7.067 9.153v-.02a.03.03 0 0 1 .008-.018q.007-.011.015-.016c.008-.004.012-.004.02-.004l5.363-.87q.012-.001.02.005.012.001.019.008c.004.003.012.007.016.015q.002.006.003.02l3.455 21.992c-.564 4.46-4.463 3.748-5.468.858z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeWidth={0.4}
          d="M10.17 4.76 9.072 3.135c-.01-.02-.027-.015-.034.004l-.6 1.8c.286.09.588.117.886.086.297-.03.584-.123.846-.267Z"
        />
        <path
          fill="#EAEAEA"
          stroke="#303030"
          strokeWidth={0.4}
          d="m15.885 34.856-3.338.552-1.457-.668-.568-3.617 5.464-.859.568 3.61z"
        />
        <path
          fill="#fff"
          stroke="#303030"
          strokeWidth={0.4}
          d="m11.09 34.74.066.413.266 1.727a2.78 2.78 0 0 0 1.109 1.81 2.8 2.8 0 0 0 2.06.494 2.78 2.78 0 0 0 1.809-1.11c.433-.594.61-1.333.494-2.06l-.27-1.72-.07-.42z"
        />
        <path
          fill="#EAEAEA"
          stroke="#303030"
          strokeWidth={0.4}
          d="m20.415 1.672-4.88 35.46c-.063.425.238.819.664.88l7.138.982c.424.059.819-.239.876-.668L29.094 2.87a.78.78 0 0 0-.665-.881l-7.137-.982a.78.78 0 0 0-.877.665Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m25.651 5.239 2.466.34M24.716 12.465l2.465.34M23.61 19.352l2.466.34M22.675 26.586l2.466.34"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M24.36 41H5.665a2.33 2.33 0 0 1-1.57-.603 2.35 2.35 0 0 1-.749-1.507L1.344 17.682a1.1 1.1 0 0 1 .046-.425 1 1 0 0 1 .2-.371q.143-.166.33-.27.192-.1.41-.12.051-.006.103-.005H27.6c.29-.003.571.105.78.31.209.2.329.48.337.769q.001.044-.004.089l-2.01 21.208a2.3 2.3 0 0 1-.75 1.526 2.3 2.3 0 0 1-1.591.607Z"
        />
      </svg>
    );
  },
);
export default SvgPenalFill;
