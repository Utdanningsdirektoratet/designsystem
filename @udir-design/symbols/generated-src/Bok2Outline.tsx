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
const SvgBok2Outline = forwardRef(
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
          stroke="#303030"
          strokeWidth={0.4}
          d="M38.822 12.088s-.478 2.211-.478 3.224c0 1.012.383 3.013.383 3.013M25.12 3.23l14.477 8.778-24.837 1.537-10.564-9.78z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="M32.587 16.203v-2.295l2.521-.224.067 2.37-1.347-.975zM16.834 14.982l20.518-1.461M20.352 16.77l8.39-.608"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M3.223 4.668c0-.746.103-.943.862-.943l10.653 9.843c-.65.196-.643.588-.65.983v4.372c0 .433.352.877.962.846.611-.03 23.693-1.52 23.693-1.52l-.215-1.274 1.647 1.607s-25.43 1.688-25.843 1.688c-.412 0-9.405-9.58-10.789-11.219-.32-.38-.32-.796-.32-1.063v-3.32Z"
        />
      </svg>
    );
  },
);
export default SvgBok2Outline;
