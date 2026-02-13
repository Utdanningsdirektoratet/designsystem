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
const SvgPenalOutline = forwardRef(
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
          stroke="#303030"
          strokeWidth={0.4}
          d="m7.41 11.217.829 5.271M2.636 16.492l-.693-4.413M6.839 7.603l.572 3.614-5.468.861-.568-3.61"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m6.839 7.603-.066-.416-.266-1.724a2.753 2.753 0 0 0-1.11-1.808 2.78 2.78 0 0 0-2.059-.496c-.36.055-.703.182-1.017.376a2.75 2.75 0 0 0-1.244 1.712c-.085.355-.1.722-.042 1.081l.274 1.72.066.421zM10.17 4.76l2.35 3.47c.008.008.01.023.008.034M7.07 9.119q-.006-.011-.007-.023-.001-.007.004-.02l1.372-4.13"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M8.22 16.492 7.067 9.152v-.02a.03.03 0 0 1 .008-.018q.007-.011.015-.016c.008-.004.012-.004.02-.004l5.363-.87q.012-.001.02.005.012.001.019.008c.004.003.012.007.016.015q.002.006.003.02l1.291 8.218M10.17 4.76 9.072 3.135c-.01-.02-.027-.015-.034.004l-.6 1.8a2.243 2.243 0 0 0 1.731-.182ZM27.22 16.492 29.093 2.87a.78.78 0 0 0-.665-.881l-7.137-.982a.78.78 0 0 0-.877.665l-2.04 14.82"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m25.651 5.239 2.466.34M24.716 12.465l2.465.34"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M24.36 41H5.665a2.33 2.33 0 0 1-1.57-.603 2.35 2.35 0 0 1-.749-1.507L1.344 17.682a1.1 1.1 0 0 1 .046-.425 1 1 0 0 1 .2-.371q.143-.166.33-.27.192-.1.41-.12.051-.006.103-.005H27.6c.29-.003.571.105.78.31.209.2.329.48.337.769q.001.044-.004.089l-2.01 21.208a2.3 2.3 0 0 1-.75 1.526 2.3 2.3 0 0 1-1.591.607Z"
        />
      </svg>
    );
  },
);
export default SvgPenalOutline;
