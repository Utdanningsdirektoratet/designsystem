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
const SvgDiagramOutline = forwardRef(
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
    const __srcH = 37;
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
        viewBox="0 0 42 37"
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
          strokeWidth={0.4}
          d="M5 29.5 11.5 7M27 22 14 6.5M36 10.5l-5.5 11"
        />
        <circle
          cx={4.134}
          cy={32.469}
          r={2.934}
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={12.23}
          cy={4.134}
          r={2.934}
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={29.081}
          cy={23.884}
          r={2.934}
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={37.866}
          cy={8.182}
          r={2.934}
          stroke="#303030"
          strokeWidth={0.4}
        />
      </svg>
    );
  },
);
export default SvgDiagramOutline;
