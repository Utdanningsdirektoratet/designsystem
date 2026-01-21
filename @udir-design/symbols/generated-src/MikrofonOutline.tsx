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
const SvgMikrofonOutline = forwardRef(
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
    const __srcW = 43;
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
        viewBox="0 0 43 42"
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
          strokeLinecap="square"
          strokeWidth={0.4}
          d="M9.145 38.505c-3.522 4.39-8.14 2.278-8.145-.915-.006-3.972 8.322-7.63 3.448-14.42"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M40.027 12.836c-1.37 1.636-3.504 2.41-5.29 2.577 0 0-2.29-1.875-3.706-3.06s-3.669-3.127-3.669-3.127a7.208 7.208 0 1 1 12.665 3.61ZM14.046 37.158 9.6 33.436l17.41-23.68 7.285 6.099zM12.316 38.718l-3.948-3.305.906-1.48 4.34 3.633z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m26.978 17.202-.008-.007a.93.93 0 0 0-1.308.116l-1.866 2.23a.93.93 0 0 0 .116 1.307l.008.007a.93.93 0 0 0 1.308-.116l1.866-2.23a.93.93 0 0 0-.116-1.307Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m25.446 19.024-.716-.6.932-1.113a.93.93 0 0 1 1.308-.116l.006.005c.394.33.446.915.116 1.308l-.932 1.114-.716-.6zM9.458 37.095l1.01.846-.653.78c-.066.079-.211.067-.323-.026l-.602-.505c-.112-.093-.149-.234-.083-.313l.491-.59z"
        />
      </svg>
    );
  },
);
export default SvgMikrofonOutline;
