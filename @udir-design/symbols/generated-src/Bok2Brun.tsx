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
const SvgBok2Brun = forwardRef(
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
    const __srcH = 27;
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
        viewBox="0 0 43 27"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#F2E8DA"
          stroke="#303030"
          strokeWidth={0.4}
          d="m38.581 11.682-.035.214c-.045.283-.104.67-.164 1.089-.119.832-.24 1.809-.24 2.333 0 .526.122 1.362.24 2.054.06.348.12.664.166.893l.027.137-24.607 1.6-.25-6.885z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeWidth={0.4}
          d="m25.12 3.23 14.477 8.778-24.837 1.537-10.564-9.78z"
        />
        <path
          fill="#6D889D"
          stroke="#303030"
          strokeWidth={0.2}
          d="M32.587 16.203v-2.295l2.521-.224.067 2.37-1.347-.975z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="m16.834 14.982 20.518-1.461M20.352 16.77l8.39-.608"
        />
        <path
          fill="#937A57"
          stroke="#303030"
          strokeWidth={0.4}
          d="M3.223 4.668c0-.746.103-.943.862-.943l10.653 9.843c-.65.196-.643.588-.65.983v4.372c0 .433.352.877.962.846.611-.03 23.543-1.521 23.543-1.521l-.233-1.395 1.815 1.73s-25.43 1.687-25.843 1.687c-.412 0-9.405-9.58-10.789-11.219-.32-.38-.32-.796-.32-1.063v-3.32Z"
        />
      </svg>
    );
  },
);
export default SvgBok2Brun;
