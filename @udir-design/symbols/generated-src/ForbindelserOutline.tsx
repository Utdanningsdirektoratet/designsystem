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
const SvgForbindelserOutline = forwardRef(
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
    const __srcH = 36;
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
        viewBox="0 0 42 36"
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
          strokeWidth={0.519}
          d="M5.022 28.652 11.055 6.53M22.116 16.083 13.57 6.028M34.183 9.547l-8.547 7.039M35.69 24.63l-9.552-5.028"
        />
        <circle
          cx={4.032}
          cy={31.442}
          r={2.832}
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={11.863}
          cy={4.032}
          r={2.832}
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={23.61}
          cy={18.389}
          r={2.832}
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={36.663}
          cy={7.947}
          r={2.832}
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={37.968}
          cy={26.221}
          r={2.832}
          stroke="#303030"
          strokeWidth={0.4}
        />
      </svg>
    );
  },
);
export default SvgForbindelserOutline;
