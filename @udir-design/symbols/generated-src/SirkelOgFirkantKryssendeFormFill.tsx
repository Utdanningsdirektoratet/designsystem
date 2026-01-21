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
const SvgSirkelOgFirkantKryssendeFormFill = forwardRef(
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
    const __srcW = 40;
    const __srcH = 40;
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
        viewBox="0 0 40 40"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <rect
          width={24.173}
          height={24.173}
          x={15.627}
          y={15.627}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.8}
        />
        <circle
          cx={15.427}
          cy={15.427}
          r={15.227}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <mask id="SirkelOgFirkantKryssendeFormFill_svg__a" fill="#fff">
          <path d="M30.853 15.426c0 8.52-6.907 15.427-15.426 15.427V16.426a1 1 0 0 1 1-1z" />
        </mask>
        <path
          fill="#D6B689"
          d="M30.853 15.426c0 8.52-6.907 15.427-15.426 15.427V16.426a1 1 0 0 1 1-1z"
        />
        <path
          fill="#303030"
          d="M30.853 15.426h.4v-.4h-.4zM15.427 30.853h-.4v.4h.4zm0-14.427h-.4zm15.426-1h-.4c0 8.3-6.727 15.027-15.026 15.027v.8c8.74 0 15.826-7.086 15.826-15.827zM15.427 30.853h.4V16.426h-.8v14.427zm0-14.427h.4a.6.6 0 0 1 .6-.6v-.8a1.4 1.4 0 0 0-1.4 1.4zm1-1v.4h14.426v-.8H16.427z"
          mask="url(#SirkelOgFirkantKryssendeFormFill_svg__a)"
        />
      </svg>
    );
  },
);
export default SvgSirkelOgFirkantKryssendeFormFill;
