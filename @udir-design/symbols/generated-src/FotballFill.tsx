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
const SvgFotballFill = forwardRef(
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
        <circle
          cx={21}
          cy={21}
          r={19.8}
          fill="#fff"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <path
          fill="#303030"
          d="m20.487 4.59 4.616-2.564 2.564.512 2.564 1.026 2.051 1.539 1.539 1.025-.246 3.415-7.572-.272zM14.333 5.615l-3.077-1.538-2.05 1.026-1.54 1.538-2.05 2.051-1.54 2.052 1.555 3.69 6.49-2.446zM14.735 24.487l1.352-8.423 8.474-1.359 3.966 7.79-6.13 6.158zM9.237 26.027l-4.647-5.54-2.564 4.616.512 2.05 1.026 2.565 1.026 2.051 1.33 1.775h3.677zM23.569 33.363l-7.184 3.534 2.564 3.59h5.128l3.077-1.026 2.564-1.025-.11-4.077zM33.214 23.581l3.335-7.245 3.938 2.613v4.615l-.513 3.077-1.299 2.827h-4.38z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.4}
          d="m20.487 4.59 4.616-2.564 2.564.512 2.564 1.026 2.051 1.539 1.539 1.025-.246 3.415-7.572-.272zM14.333 5.615l-3.077-1.538-2.05 1.026-1.54 1.538-2.05 2.051-1.54 2.052 1.555 3.69 6.49-2.446zM14.735 24.487l1.352-8.423 8.474-1.359 3.966 7.79-6.13 6.158zM9.237 26.027l-4.647-5.54-2.564 4.616.512 2.05 1.026 2.565 1.026 2.051 1.33 1.775h3.677zM23.569 33.363l-7.184 3.534 2.564 3.59h5.128l3.077-1.026 2.564-1.025-.11-4.077zM33.214 23.581l3.335-7.245 3.938 2.613v4.615l-.513 3.077-1.299 2.827h-4.38z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m4.59 20.487 1.025-6.154M9.084 33.546l7.818 3.636M23.71 34.507l-1.684-6.84M8.579 26.445l6.728-2M29.224 34.85l5.11-5.645M28.18 22.539l5.779 1.535M24.59 15.359l1.487-6.239M36.634 17.077l-3.273-7.818M16.385 16.385l-4.616-4.616M14.333 5.615 21 4.59"
        />
      </svg>
    );
  },
);
export default SvgFotballFill;
