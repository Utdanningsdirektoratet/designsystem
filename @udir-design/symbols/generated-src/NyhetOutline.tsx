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
const SvgNyhetOutline = forwardRef(
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
    const __srcH = 39;
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
        viewBox="0 0 42 39"
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
          d="M32.508 4.568h6.111M41 33.78c0 2.294-2.22 3.324-3.728 3.324-3.62 0-4.355-2.138-4.488-3.324h3.237V6.477c0-.747.664-1.909 2.655-1.909 1.594 0 2.213 1.273 2.324 1.91z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M32.701 1H1v32.282c0 3.12 2.392 3.802 3.581 3.774H36.45C33.66 36.99 32.7 34.7 32.7 33.282z"
        />
        <rect
          width={11.543}
          height={10.524}
          x={5.298}
          y={12.656}
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.318}
        />
        <path stroke="#303030" d="M8.666 6.116h16.818M8.666 8.907h16.818" />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M6.866 26.461h8.407M19.856 14.153h8.407M19.856 26.461h8.407M6.866 33.59h8.407M19.856 21.283h8.407M19.856 33.59h8.407M19.856 23.914h8.407M6.866 28.837h8.407M19.856 16.53h8.407M19.856 28.837h8.407M6.866 31.214h8.407M19.856 18.906h8.407M19.856 31.214h8.407"
        />
      </svg>
    );
  },
);
export default SvgNyhetOutline;
