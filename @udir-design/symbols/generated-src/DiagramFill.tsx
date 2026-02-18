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
const SvgDiagramFill = forwardRef(
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
          d="m4.638 30.624 7.276-24.427M26.986 22.309 13.993 6.197M36.861 9.835 30.5 22"
        />
        <circle
          cx={4.134}
          cy={32.469}
          r={2.934}
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={12.23}
          cy={4.134}
          r={2.934}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={29.081}
          cy={23.884}
          r={2.934}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={37.866}
          cy={8.182}
          r={2.934}
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
        />
      </svg>
    );
  },
);
export default SvgDiagramFill;
