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
const SvgTrehjulsykkelFill = forwardRef(
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
    const __srcH = 36;
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
        viewBox="0 0 42 36"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          clipPath="url(#TrehjulsykkelFill_svg__a)"
        >
          <path
            fill="#BED5E8"
            d="m14.674 1.12-5.9 1.007a.715.715 0 0 0-.584.825l.066.39c.067.389.436.65.825.584l5.9-1.006a.715.715 0 0 0 .585-.825l-.067-.39a.715.715 0 0 0-.825-.585Z"
          />
          <path
            fill="#E5CEAE"
            strokeLinecap="round"
            d="M34.61 7.956c-.147 1.796-2.787 1.563-2.787 1.563l-9.628-.792s-.55-.037-.506-.58c.037-.451.355-.572.539-.556.183.016 7.67-.19 9.001-.219 2.012-.043 2.406-1.3 2.9-1.789.35-.345.565 1.36.481 2.375z"
          />
          <path d="M9.598 27.732a2.485 2.485 0 1 0 0-4.97 2.485 2.485 0 0 0 0 4.97ZM8.012 23.336l-1.876-2.259" />
          <path strokeLinecap="round" d="m5.48 21.624 1.315-1.093" />
          <path d="m11.186 27.16 1.874 2.259" />
          <path strokeLinecap="round" d="m13.719 28.872-1.316 1.092" />
          <path
            fill="#76C69D"
            d="M35.23 27.16c.546 1.13-.672 1.868-1.358 1.13a308 308 0 0 1-2.916-3.202c-3.89-4.321-4.37-5.054-5.972-6.244-.514-.382-2.362-1.715-5.12-2.76a22.1 22.1 0 0 0-5.847-1.347l-3.63 10.512c-.497 1.186-1.981.643-1.75-.483l1.877-9.732s.547-5.286-.666-11.238l1.95-.334c1.972 7.496 2.265 8.707 2.265 8.707l11.697-.367a.89.89 0 0 0 .963-.829l.122-1.864 2.351.193-.256 5.054c-.038.569 6.287 12.802 6.287 12.802z"
          />
          <path
            fill="#7F99AE"
            d="M9.598 16.82A8.6 8.6 0 0 0 1 25.42a8.6 8.6 0 0 0 8.598 8.598c4.75 0 8.598-3.85 8.598-8.598 0-4.75-3.849-8.599-8.598-8.599Zm0 15.537a6.939 6.939 0 1 1 0-13.877 6.939 6.939 0 0 1 0 13.877ZM34.628 21.362a6.373 6.373 0 1 0 .001 12.745 6.373 6.373 0 0 0-.001-12.745Zm0 10.939a4.567 4.567 0 1 1 0-9.134 4.567 4.567 0 0 1 0 9.134Z"
          />
        </g>
        <defs>
          <clipPath id="TrehjulsykkelFill_svg__a">
            <path fill="#fff" d="M0 0h42v35.106H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgTrehjulsykkelFill;
