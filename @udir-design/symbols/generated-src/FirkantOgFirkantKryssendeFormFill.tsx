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
const SvgFirkantOgFirkantKryssendeFormFill = forwardRef(
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
        viewBox="0 0 42 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <rect
          width={26.267}
          height={26.267}
          x={14.533}
          y={14.533}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.8}
        />
        <rect
          width={26.267}
          height={26.267}
          x={1.2}
          y={1.2}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.8}
        />
        <mask id="FirkantOgFirkantKryssendeFormFill_svg__a" fill="#fff">
          <path d="M27.666 26.666a1 1 0 0 1-1 1H14.333V15.333a1 1 0 0 1 1-1h12.333z" />
        </mask>
        <path
          fill="#D6B689"
          d="M27.666 26.666a1 1 0 0 1-1 1H14.333V15.333a1 1 0 0 1 1-1h12.333z"
        />
        <path
          fill="#303030"
          d="M27.666 26.666h.4zm-1 1v.4zm-12.333 0h-.4v.4h.4zm13.333-13.333h.4v-.4h-.4zm0 12.333h-.4a.6.6 0 0 1-.6.6v.8a1.4 1.4 0 0 0 1.4-1.4zm-1 1v-.4H14.333v.8h12.333zm-12.333 0h.4V15.333h-.8v12.333zm0-12.333h.4a.6.6 0 0 1 .6-.6v-.8a1.4 1.4 0 0 0-1.4 1.4zm1-1v.4h12.333v-.8H15.333zm12.333 0h-.4v12.333h.8V14.333z"
          mask="url(#FirkantOgFirkantKryssendeFormFill_svg__a)"
        />
      </svg>
    );
  },
);
export default SvgFirkantOgFirkantKryssendeFormFill;
