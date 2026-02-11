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
const SvgBadeballOutline = forwardRef(
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
    const __srcH = 42;
    const __isWide = true;
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
        viewBox="0 0 42 42"
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
          strokeLinecap="round"
          strokeWidth={0.4}
          d="M17.746 16.584c.252 7.443.302 20.533 3.168 23.686m-3.168-23.686c2.293.483 4.526-.603 5.884-2.565m-5.884 2.565c-2.293-.241-3.62-1.86-3.922-2.565m3.922 2.565c.201 7.242.151 20.367 3.168 23.686m0 0c3.169.302 11.677-1.116 17.35-8.6m-17.35 8.6c-3.57.05-12.37-2.354-17.802-10.56m35.152 1.96c.453-2.866-.996-8.478-14.634-17.65m14.634 17.65c1.056-6.185-9.404-14.332-14.634-17.65m14.634 17.65c2.263-3.62 5.401-14.06-1.358-23.233M23.63 14.02c1.328-2.655 0-4.827-.604-5.43m-9.051 1.357c.301-.905 1.69-2.836 4.827-3.32m-4.827 3.32c-2.776-1.69-6.79-1.911-8.449-1.81m8.449 1.81c-.302.553-.875 2.263-.151 4.073m.15-4.073c-3.138-1.569-6.889-1.911-8.448-1.81m13.276-1.51c.1-1.608.513-4.978 1.358-5.581m-1.358 5.582c.956 0 3.138.392 4.224 1.961m-4.224-1.961c.242-4.345.956-5.532 1.358-5.582m0 0c-2.715 0-9.444 1.418-14.634 7.09m14.634-7.09c6.638-.483 13.504 2.99 16.746 7.392m-31.38-.301C-.871 14.894.679 25.698 3.112 29.709m10.712-15.69C3.806 20.9 2.458 27.245 3.112 29.71m10.712-15.69C9.85 16.685 2.147 23.554 3.112 29.71M23.027 8.59c7-3.018 12.22-1.359 13.88-.152m-13.88.151c2.564-1.257 9.293-2.806 13.88-.15"
        />
      </svg>
    );
  },
);
export default SvgBadeballOutline;
