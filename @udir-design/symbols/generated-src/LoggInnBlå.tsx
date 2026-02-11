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
const SvgLoggInnBl = forwardRef(
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
    const __srcH = 41;
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
        viewBox="0 0 42 41"
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
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M28.917 39.657a1.752 1.752 0 0 1 0-3.504c2.66 0 4.914-.02 6.524-.565 1.409-.476 2.055-1.454 2.055-2.94V8.009c0-1.217-.88-2.541-2.055-2.94-1.61-.544-3.865-.564-6.524-.564a1.752 1.752 0 0 1 0-3.504c2.46 0 5.371-.02 7.646.75 1.188.401 2.338 1.058 3.18 2.152C40.593 5.01 41 6.395 41 8.008v24.64c0 1.614-.406 3-1.258 4.107-.841 1.094-1.99 1.75-3.179 2.153-2.275.769-5.185.75-7.646.75Z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M30.635 20.207 21.358 9.76c-.115-.2-.41-.116-.41.121v2.13c0 .13-.096.233-.22.233H1.226c-.287 0-.313 16.17 0 16.17H20.73c.123 0 .22.104.22.234v2.13c0 .237.294.321.409.12l9.277-10.447a.24.24 0 0 0 0-.243Z"
        />
      </svg>
    );
  },
);
export default SvgLoggInnBl;
