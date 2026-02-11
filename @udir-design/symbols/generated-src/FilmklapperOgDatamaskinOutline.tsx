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
const SvgFilmklapperOgDatamaskinOutline = forwardRef(
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
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M21.133 7.1 2.52 4.726 2.249 6.86 20.86 9.235z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M2.25 6.86 20.86 9.235l-1.074 8.418a1.38 1.38 0 0 1-1.541 1.193L2.364 16.82a1.377 1.377 0 0 1-1.19-1.538l1.074-8.423z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m4.062 7.091-1.644-.21L4.355 4.96l1.644.21zM2.407 6.88l-.157-.02.243-1.905.208-.207 1.643.21zM5.716 7.302l-1.643-.21L6.01 5.17l1.643.21zM7.37 7.513l-1.644-.21 1.938-1.922 1.644.21zM9.025 7.723 7.38 7.514 9.32 5.592l1.643.21zM10.679 7.935l-1.644-.21 1.938-1.923 1.643.21zM12.334 8.146l-1.644-.21 1.937-1.922 1.644.21zM13.987 8.356l-1.643-.209 1.937-1.923 1.644.21zM15.642 8.568 14 8.358l1.937-1.923 1.644.21zM17.296 8.779l-1.643-.21 1.937-1.922 1.643.21zM18.951 8.99l-1.644-.21 1.938-1.923 1.643.21zM20.605 9.2l-1.643-.209 1.937-1.923.234.03-.23 1.807zM21.078 1 2.368 2.39l.159 2.147 18.71-1.39z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m4.35 4.401-1.653.123 1.515-2.27 1.652-.123zM2.686 4.525l-.159.012-.142-1.915.163-.245L4.2 2.255zM6.013 4.277 4.36 4.4l1.514-2.27 1.652-.123zM7.675 4.154l-1.652.122 1.515-2.27 1.652-.122zM9.339 4.03l-1.652.123L9.2 1.883l1.653-.123zM11.001 3.907 9.35 4.03l1.515-2.271 1.652-.123zM12.665 3.784l-1.652.123 1.515-2.27 1.652-.124zM14.328 3.66l-1.653.123 1.515-2.27 1.653-.124zM15.99 3.536l-1.651.123 1.515-2.27 1.652-.124zM17.654 3.413l-1.651.123 1.514-2.27 1.652-.124zM19.318 3.29l-1.653.122 1.515-2.27 1.653-.123zM20.98 3.166l-1.652.122 1.515-2.27.235-.018.135 1.816z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m4.55 9.688 13.373 1.705M4.344 12.432l13.374 1.704M7.733 12.864l-.33 2.593M14.046 13.669l-.33 2.593"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m9.308 5.59 22.356-3.044a1.116 1.116 0 0 1 1.256.954l2.019 14.835a1.116 1.116 0 0 1-.955 1.256l-23.67 3.221a1.116 1.116 0 0 1-1.256-.954L8.48 17.6"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m11.435 5.861 19.76-2.69a1.116 1.116 0 0 1 1.255.956l1.758 12.913a1.116 1.116 0 0 1-.955 1.256l-22.58 3.073a1.116 1.116 0 0 1-1.256-.955l-.374-2.743"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m40.944 23.414.053.397a.27.27 0 0 1-.23.303l-35.784 4.87a.27.27 0 0 1-.302-.23l-.054-.398a.27.27 0 0 1 .077-.227l4.212-4.175.023-.02c.24-.198.53-.324.838-.367l14.541-1.978 7.381-1.005 3.006-.409c.304-.041.614.003.896.127l.028.013 5.18 2.9a.27.27 0 0 1 .135.198Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m5.478 28.182 34.6-4.709"
        />
      </svg>
    );
  },
);
export default SvgFilmklapperOgDatamaskinOutline;
