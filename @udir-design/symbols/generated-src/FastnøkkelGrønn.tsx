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
const SvgFastnkkelGrnn = forwardRef(
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
    const __srcH = 22;
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
        viewBox="0 0 42 22"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M40.999 6.598 37.513 7.69a.71.71 0 0 1-.888-.464l-.876-2.795a.71.71 0 0 1 .465-.887l3.485-1.093a4.805 4.805 0 0 0-8.18 2.564L9.18 12.018A4.805 4.805 0 0 0 1 14.582h.001l3.502-1.097a.71.71 0 0 1 .887.464l.876 2.795a.71.71 0 0 1-.464.887L2.3 18.73a4.805 4.805 0 0 0 8.18-2.564L32.82 9.162A4.805 4.805 0 0 0 41 6.598z"
        />
      </svg>
    );
  },
);
export default SvgFastnkkelGrnn;
