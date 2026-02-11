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
const SvgVerdenFill = forwardRef(
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
    const __srcH = 42;
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
        viewBox="0 0 42 42"
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
          clipPath="url(#VerdenFill_svg__a)"
        >
          <path
            fill="#BED5E8"
            strokeWidth={0.4}
            d="M21 41c11.046 0 20-8.954 20-20S32.046 1 21 1 1 9.954 1 21s8.954 20 20 20Z"
          />
          <path
            fill="#76C69D"
            strokeWidth={0.402}
            d="M12.022 19.896h1.088l.779.623 1.088.468.935 1.188.934 1.067h2.179l.855 1.244v1.167l-.779 1.088-.155 2.099-1.712 1.011v1.088l-1.283 1.479-.66 1.244-1.167.467.156 1.244s-.156 2.023 1.011 2.646c0 0-1.479.779-2.334-.78-.856-1.557-.468-2.022-.468-2.022l-.467-1.088-.388-3.813v-2.1l-1.244-1.243-1.79-2.41v-1.168l1.167-2.41.156-1.089 1.243-.779z"
          />
          <path
            fill="#76C69D"
            strokeWidth={0.402}
            d="m1.43 16.86 1.403-.7 1.182 1.719 1.611.449 1.505 1.592 2.258.644-1.397-1.61-.7-1.051h-.778l.504-1.207s-1.4.855-1.867.311-.779-3.382 1.244-3.034c2.022.349 2.49 1.44 2.49 1.44l.66-2.023 1.671-1.828 1.635-.66.584-1.011 1.515.156V8.568l2.063.66-.78-2.762L14.212 5.3l-1.167 1.128-1.44 1.671-1.555-1.479 1.284-1.323 1.362-.504.972-.544 1.244-.779.155 1.167.896.544 1.05-.816-1.322-1.867s2.45-1.011 3.15-.35.544 1.478.272 1.943c-.272.464-.04 2.255.816 1.906.855-.348.972-1.05 2.062-1.44 1.09-.387 2.295-.934 2.295-.934s.7-.195.935-.504c.235-.31.794-1.49.794-1.49s-3.549-1.04-7.887-.427c-6.15.866-14.31 5.323-16.697 15.653zM32.8 14.243l-2.178-.748v-1.12s-2.614.373-2.925.624c-.312.25-1.315.871-1.685 1.244-.37.372-1.801 2.366-1.801 3.361s.124 2.614.684 2.863c.56.248 2.178 1.243 3.61.871 1.43-.372 1.99.747 1.867 1.806-.125 1.059 1.494 1.12 1.307 2.49s-1.12 1.556-.188 3.673.935 3.299 1.555 3.238c.621-.061 2.427-.436 2.926-1.867s.996-2.739 1.431-2.802.809-1.12.809-1.12l-.312-1.93.312-1.619 1.866-1.742s.935-1.495.312-1.743-.808.372-1.12.187c-.311-.184-1.99-2.862-1.99-2.862l-.56-1.867 1.307 1.806.808 1.645.808.547 1.236-.335s-.463-9.068-9.084-14.674l-1.101 1.098-1.014.729.567.607-.203 1.257-.932.528-.81-1.175-.365-.853-.81.853-.772 1.054.364.04 1.014-.772.04 1.014.893.122-1.136.446.607 1.054-.689.607h-.932v1.339l.528.932.365-.729.729-.243.974-1.053 1.46-.486 1.175 1.135-.446.447.285.528.486-.325.33-.69-.898-1.217h.365l1.663 2.19.568-.204-.203-.966h.568l.324 1.048 1.867.203-.407 1.542-1.663-.04-.607-.607-.975.122v.539z"
          />
        </g>
        <defs>
          <clipPath id="VerdenFill_svg__a">
            <path fill="#fff" d="M0 0h42v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgVerdenFill;
