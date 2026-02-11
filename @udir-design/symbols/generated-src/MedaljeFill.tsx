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
const SvgMedaljeFill = forwardRef(
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
    const __srcW = 33;
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
        viewBox="0 0 33 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M6.396 18.81C5.662 19.915 1.266 27.078 1 39.9a.187.187 0 0 0 .295.159l4.035-2.815a.19.19 0 0 1 .239.018l3.707 3.685c.122.117.323.032.318-.136-.065-2.319-.079-12.713 4.61-18.998a.23.23 0 0 0-.102-.355l-7.435-2.74a.24.24 0 0 0-.27.094Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M13.391 23.604c.524 1.388 4.783 11.965 13.77 14.078a.053.053 0 0 0 .061-.042l.355-4.212q.002-.023.024-.038l3.633-1.866c.037-.019.037-.07 0-.084-1-.397-9.641-4.045-11.05-11.484a.185.185 0 0 0-.27-.13l-6.439 3.548a.19.19 0 0 0-.084.23Z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M13.251 1C6.94.948 1.781 6.021 1.728 12.332s5.02 11.47 11.332 11.523h.191c6.311.053 11.47-5.02 11.523-11.331.053-6.312-5.02-11.47-11.331-11.524z"
        />
      </svg>
    );
  },
);
export default SvgMedaljeFill;
