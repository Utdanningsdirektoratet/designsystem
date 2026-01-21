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
const SvgTape1Outline = forwardRef(
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
          strokeWidth={0.4}
          d="M3.806 9.167C8.672 1.654 18.707-.493 26.22 4.374c7.512 4.866 9.658 14.9 4.793 22.414C26.147 34.3 16.11 36.446 8.599 31.58c-7.513-4.866-9.66-14.902-4.793-22.414Zm18.129 1.823a8.326 8.326 0 1 0-9.053 13.976 8.326 8.326 0 0 0 9.053-13.976Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M10.602 3.268c5.1-2.394 11.034-1.868 17.196-.07C35.535 5.456 40.198 2.291 41 1"
        />
        <circle
          cx={17.409}
          cy={17.977}
          r={9.491}
          stroke="#303030"
          strokeWidth={0.104}
        />
        <circle
          cx={17.409}
          cy={17.977}
          r={11.631}
          stroke="#303030"
          strokeWidth={0.104}
        />
        <circle
          cx={17.409}
          cy={17.977}
          r={12.625}
          stroke="#303030"
          strokeWidth={0.104}
        />
        <circle
          cx={17.409}
          cy={17.977}
          r={14.192}
          stroke="#303030"
          strokeWidth={0.104}
        />
      </svg>
    );
  },
);
export default SvgTape1Outline;
