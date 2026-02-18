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
const SvgStpselBl = forwardRef(
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
    const __srcW = 22;
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
        viewBox="0 0 22 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m9.417 25.46.874 4.371c.199.995 2.444 1.387 5.015.872 2.57-.514 4.493-1.737 4.295-2.732l-.874-4.372z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m15.883 24.168-.716-3.585a.29.29 0 0 1 .226-.34l.547-.109a.29.29 0 0 1 .34.226l.716 3.585-1.111.223zM11.149 25.115l-.717-3.585a.29.29 0 0 1 .226-.34l.548-.109a.29.29 0 0 1 .339.227l.716 3.585-1.11.222z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M16.184 30.49s-.437.114-.777.193c-.364.083-.742.13-.742.13s1.513 5.363-.78 8.027C11.024 42.167 2.977 32.114 2.74 27.31c-.213-4.324 1.03-5.681 12.663-17.143C20.483 5.165 20.218 1 20.218 1h-1.629s.336 3.65-4.504 8.522C8.653 14.992-.297 22.242 1.158 28.527c1.515 6.55 10.663 17.138 14.378 10.21 1.67-3.116.648-8.247.648-8.247Z"
        />
      </svg>
    );
  },
);
export default SvgStpselBl;
