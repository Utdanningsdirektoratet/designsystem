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
const SvgStolpediagramAOutline = forwardRef(
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
    const __srcH = 31;
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
        viewBox="0 0 42 31"
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
          d="M39.4 29.09H2.6a1.6 1.6 0 0 1-1.6-1.6V2.6A1.603 1.603 0 0 1 2.6 1h36.8A1.6 1.6 0 0 1 41 2.6v24.891a1.605 1.605 0 0 1-1.6 1.599Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M9.473 16.054v8.71H4.97v-8.71c0-.117.047-.23.132-.311a.43.43 0 0 1 .31-.132H9.03c.117 0 .23.047.312.131.085.083.13.195.13.312ZM26.418 12.635v12.13h-4.502v-12.13c0-.117.046-.23.13-.312a.43.43 0 0 1 .312-.13h3.618c.117 0 .229.046.311.13.085.083.13.195.13.311ZM35.27 10.267v14.497H30.77V10.267c0-.116.045-.23.13-.312a.43.43 0 0 1 .311-.13h3.619c.117 0 .229.046.311.13.085.083.13.196.13.312ZM17.716 8.513v16.251h-4.502V8.513c0-.117.046-.229.13-.311a.43.43 0 0 1 .312-.13h3.618c.117 0 .23.045.312.13.084.082.13.194.13.31Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="M3.954 24.764h32.77"
        />
      </svg>
    );
  },
);
export default SvgStolpediagramAOutline;
