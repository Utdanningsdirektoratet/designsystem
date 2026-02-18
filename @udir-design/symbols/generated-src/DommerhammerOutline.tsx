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
const SvgDommerhammerOutline = forwardRef(
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
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M39.923 38.808v-1.685a.684.684 0 0 0-.684-.684H19.974a.684.684 0 0 0-.684.684v1.685c0 .378.306.684.684.684H39.24a.684.684 0 0 0 .684-.684ZM39.074 35.755v-.16a.684.684 0 0 0-.684-.683H20.824a.684.684 0 0 0-.684.684v.16c0 .377.306.683.684.683H38.39a.684.684 0 0 0 .684-.684ZM16.865 9.96l2.573 1.377L4.027 40.152a.96.96 0 0 1-1.302.394l-.877-.469a.96.96 0 0 1-.394-1.301zM11.318 7.012a.564.564 0 0 1-.231-.763l2.339-4.371a.564.564 0 0 1 .763-.232M27.901 8.96a.564.564 0 0 1 .232.764l-2.34 4.371a.564.564 0 0 1-.762.232"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m18.1 10.63-2.06-1.102 2.872-5.365L20.93 5.24l2.196 1.175-2.87 5.365zM22.315 12.884l-.887-.475 2.87-5.366.871.466.948.506-2.87 5.366zM13.975 8.423l-.873-.468 2.87-5.365.857.457.934.5-2.87 5.366zM27.575 7.92l-.49-.262a.684.684 0 0 0-.926.28l-2.946 5.51a.684.684 0 0 0 .28.925l.49.262a.684.684 0 0 0 .926-.28l2.946-5.51a.684.684 0 0 0-.28-.925ZM24.294 6.995a.65.65 0 0 0-1.148-.614l-2.9 5.425a.65.65 0 0 0 1.147.614z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M18.93 4.126a.65.65 0 1 0-1.148-.614l-2.9 5.425a.65.65 0 0 0 1.147.613zM15.731 1.585l-.49-.262a.684.684 0 0 0-.925.28l-2.947 5.509a.684.684 0 0 0 .281.925l.49.262a.684.684 0 0 0 .925-.28l2.947-5.509a.684.684 0 0 0-.28-.925Z"
        />
      </svg>
    );
  },
);
export default SvgDommerhammerOutline;
