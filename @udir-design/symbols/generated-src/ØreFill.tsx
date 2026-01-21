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
const SvgReFill = forwardRef(
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
    const __srcW = 29;
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
        viewBox="0 0 29 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#ECDBC2"
          d="M2.437 7.866S8.58-2.21 18.738 2.05c10.159 4.26 9.4 13.577 6.339 17.604-2.962 3.895-4.538 6.97-5.357 12.212C18.903 37.108 11.96 41 7.62 41c-3.426 0-5.894-2.132-5.183-7.649 0 0 .836-9.79-.775-15.221-1.854-6.25.775-10.262.775-10.262z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.352}
          d="M2.437 7.866S8.58-2.21 18.738 2.05c10.159 4.26 9.4 13.577 6.339 17.604-2.962 3.895-4.538 6.97-5.357 12.212C18.903 37.108 11.96 41 7.62 41c-3.426 0-5.894-2.132-5.183-7.649"
        />
        <path
          fill="#E5CEAE"
          d="M6.984 8.92s3.643-6.041 10.713-3.087 5.328 10.107 3.955 12.304c-2.197 3.515-4.394 3.515-6.591 10.985-1.023 3.476-3.955 4.393-6.152 3.075-1.901-1.14-2.197-3.954-1.318-5.712 0 0 2.197-3.076 1.758-5.712-.41-2.452-3.076-3.515-3.516-6.152S6.984 8.92 6.984 8.92"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.264}
          d="M23.114 12.443c-2.59-8.549-9.843-8.678-14.186-5.624-3.632 2.554-4.724 9.928-.828 10.123.87.045 2.905-.566 4.147-2.923.737-1.394 2.658-2.175 4.23-1.267s2.886 4.151 1.148 6.038c-3.815 4.143-2.898 8.057-2.898 10.619 0 4.145-7.028 5.543-7.602-.426"
        />
      </svg>
    );
  },
);
export default SvgReFill;
