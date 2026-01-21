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
const SvgMegafonFill = forwardRef(
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
    const __srcH = 29;
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
        viewBox="0 0 42 29"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10.881 8.772h-6.21v8.554h6.21z"
        />
        <path
          fill="#D3E6F6"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M7.006 27.343h3.019V17.326H5.528zM32.024 1H29.47L10.881 8.778v8.542l18.59 7.777h2.552a.544.544 0 0 0 .545-.544V1.544A.544.544 0 0 0 32.024 1Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M35.058 13.049c0-2.028-1.115-3.672-2.49-3.672v7.344c1.375 0 2.49-1.645 2.49-3.672Z"
        />
        <path
          fill="#D3E6F6"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 13.049c0 2.362 1.644 4.277 3.672 4.277V8.772C2.644 8.772 1 10.687 1 13.049Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M38.156 13.049H41M37.463 8.88l2.674-.973M35.46 4.743l2.012-2.01M35.46 21.354l2.012 2.011M37.463 17.218l2.674.973"
        />
      </svg>
    );
  },
);
export default SvgMegafonFill;
