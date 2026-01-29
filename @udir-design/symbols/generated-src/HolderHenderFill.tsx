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
const SvgHolderHenderFill = forwardRef(
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
    const __srcW = 41;
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
        viewBox="0 0 41 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10.524 21.335C7.918 15.634 1 4.498 1 4.498L9.79 1l7.295 15.789c2.29 4.217 5.121 8.162-.428 12.387-2.057 1.566-4.6-4.487-6.133-7.84Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.485 27.354c.58-.531 2.57-2.43 2.57-2.43 1.005-.972 1.653 1.982 1.575 2.786 0 0-.935 1.203-1.006 1.928s-1.43 2.846-2.634 2.63c-1.063-.188-1.578-3.93-.505-4.914Z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M22.574 38.033c5.586-8.42 5.228-12.267 6.387-14.295 1.505-2.633 10.552-16.88 10.552-16.88L32.806 1.86l-9.731 14.344s-.83 1.52-2.613 1.951c-2.499.603-5.91.368-7.25 2.235-1.808 2.519-3.243 2.952-3.323 4.138s1.104 2.54.688 3.58c-.415 1.038-1.176.954 0 4.795.818 2.67 2.782.234 2.782.234l-.002.004c-1.119 1.458-1.639 2.136-.144 3.262 1.675.862 2.932-.894 2.932-.894s-.848 1.215-1.47 1.988c-.681.846-.358 1.478 1.19 2.143 1.315.233 3.126-2.326 3.126-2.326-1.22 2.018-1.273 3.246-.383 3.542 1.648.548 2.42-.495 3.966-2.824Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m21.726 37.124 1.032.84c.675.55.849 1.454.388 2.02l-.142.174c-.46.565-1.38.578-2.057.028l-1.032-.84c-.675-.55-1.27-1.6-1.023-2.3.268-.757 1.607-.955 2.833.077ZM23.963 31.162l3.34 2.26c.587.432.672 1.477.146 2.028-.525.55-1.259.712-1.846.28l-3.265-2.204c-.587-.432-1.756-1.699-.955-2.623.707-.817 2.58.26 2.58.26ZM22.24 33.692l3.253 2.396c.602.443.89 1.338.503 1.863l-.3.408c-.387.525-1.302.48-1.904.037L20.54 36c-.601-.443-1.841-1.845-1.126-2.737.408-.508 2.225-.014 2.826.429ZM26.34 29.437l2.037.882c.615.266.898.982.631 1.597l-.098.229a1.214 1.214 0 0 1-1.597.631l-2.037-.882c-.615-.266-1.421-.906-1.264-1.712.18-.92 1.713-1.012 2.328-.745Z"
        />
      </svg>
    );
  },
);
export default SvgHolderHenderFill;
