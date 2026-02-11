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
const SvgForstrrelsesglassOutline = forwardRef(
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
    const __srcW = 28;
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
        viewBox="0 0 28 42"
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
          d="M17.584 5.522A9.067 9.067 0 1 1 9.87 21.933a9.067 9.067 0 0 1 7.714-16.411Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.4}
          d="M8.994 8.383c-1.132.837-2.735 2.97-2.34 5.756"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.4}
          d="M8.808 10.097c-.88.806-1.71 2.229-1.161 4.639"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m18.674 21.94 5.981 16.907a.8.8 0 0 1-.487 1.021l-1.723.61a.8.8 0 0 1-1.02-.488l-5.981-16.907z"
        />
      </svg>
    );
  },
);
export default SvgForstrrelsesglassOutline;
