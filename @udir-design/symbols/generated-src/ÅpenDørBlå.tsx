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
const SvgPenDrBl = forwardRef(
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
    const __srcW = 27;
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
        viewBox="0 0 27 42"
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
          d="M1 5.813v30.4c0 .111 24.164.413 24.164 0v-30.4c0-.454-24.164-.13-24.164 0Z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10.26 1.01v39.98c0 .225 14.904-3.441 14.904-3.695V4.705c0-.274-14.903-3.92-14.903-3.695Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.4}
          d="M13.637 20.126s-.427-.057-.701-.048c-.287.01-.727.103-.727.103l-.554-.103"
        />
        <ellipse cx={11.793} cy={20.128} fill="#303030" rx={0.368} ry={0.433} />
        <ellipse cx={11.793} cy={21.434} fill="#303030" rx={0.314} ry={0.37} />
      </svg>
    );
  },
);
export default SvgPenDrBl;
