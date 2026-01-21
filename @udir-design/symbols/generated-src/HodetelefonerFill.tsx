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
const SvgHodetelefonerFill = forwardRef(
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
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M33.363 7.981c2.48 3.335 3.915 7.989 3.28 12.635M7.109 16.579c.637-4.656 3.289-8.7 6.583-11.248"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M33.363 7.98c-1.58.963-1.445-3.33-9.43-4.422-7.984-1.093-9.186 3.27-10.271 1.727-.788-1.12 2.612-5.193 10.597-4.1s10.371 6.024 9.107 6.794z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M35.009 32.508s-.593 7.224-5.686 6.527l-5.801-.792"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m35.666 32.593-1.73-.236 1.627-11.89 1.73.236a3.744 3.744 0 0 1 3.2 4.215l-.613 4.477a3.744 3.744 0 0 1-4.215 3.2zM6.334 16.477l1.73.236-1.627 11.89-1.73-.236a3.744 3.744 0 0 1-3.2-4.215l.613-4.477a3.744 3.744 0 0 1 4.215-3.2z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m22.539 36.883-4.65-.637a1.155 1.155 0 0 0-1.301.988l-.017.122a1.155 1.155 0 0 0 .988 1.302l4.65.636a1.155 1.155 0 0 0 1.3-.988l.017-.122a1.155 1.155 0 0 0-.988-1.301Z"
        />
      </svg>
    );
  },
);
export default SvgHodetelefonerFill;
