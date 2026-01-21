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
const SvgMobilFill = forwardRef(
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
          fill="#7F99AE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.37 1H3.715A2.716 2.716 0 0 0 1 3.716v34.568C1 39.784 2.216 41 3.716 41h13.653c1.5 0 2.716-1.216 2.716-2.716V3.716c0-1.5-1.216-2.716-2.716-2.716Z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M18.702 4.069H2.386a.5.5 0 0 0-.5.5V35.28a.5.5 0 0 0 .5.5h16.316a.5.5 0 0 0 .5-.5V4.57a.5.5 0 0 0-.5-.5Z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M12.302 2.325H8.785a.24.24 0 1 0 0 .482h3.517a.24.24 0 1 0 0-.482ZM10.543 39.595a1.33 1.33 0 1 0 0-2.66 1.33 1.33 0 0 0 0 2.66Z"
        />
      </svg>
    );
  },
);
export default SvgMobilFill;
