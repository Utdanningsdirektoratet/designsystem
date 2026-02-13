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
const SvgMedaljeOutline = forwardRef(
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
          stroke="#303030"
          strokeWidth={0.4}
          d="M5.3 20.728c-1.556 3.066-4.1 9.513-4.3 19.17a.187.187 0 0 0 .295.16l4.035-2.815a.19.19 0 0 1 .239.018l3.707 3.685c.122.116.323.032.318-.136-.058-2.082-.075-10.675 3.316-16.957M13.489 23.855c.832 2.102 5.103 11.812 13.673 13.827a.053.053 0 0 0 .06-.042l.356-4.213q.002-.022.023-.037l3.633-1.866c.037-.02.037-.07 0-.084-.937-.373-8.585-3.599-10.702-10.126"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M13.251 1C6.94.948 1.781 6.021 1.728 12.332s5.02 11.47 11.332 11.523h.191c6.312.053 11.47-5.02 11.524-11.331C24.827 6.212 19.754 1.054 13.442 1z"
        />
      </svg>
    );
  },
);
export default SvgMedaljeOutline;
