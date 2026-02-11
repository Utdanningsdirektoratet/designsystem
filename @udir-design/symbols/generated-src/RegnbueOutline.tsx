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
const SvgRegnbueOutline = forwardRef(
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
    const __srcH = 23;
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
        viewBox="0 0 42 23"
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
          strokeWidth={0.432}
          d="M5.07 13.095c.58-1.837 2.597-6.896 7.844-9.516C19.4.34 26.315-.133 32.328 3.806c4.368 2.86 5.712 8.703 6.12 11.688"
        />
        <path
          stroke="#303030"
          strokeWidth={0.432}
          d="M15.408 16.993c2.234-4.006 6.189-4.716 9.133-3.31a6.2 6.2 0 0 1 3.267 3.753"
        />
        <path
          stroke="#303030"
          strokeWidth={0.432}
          d="M13.951 14.684c1.55-2.105 4.086-4.162 8.062-4.093 3.799.066 6.055 2.162 7.38 4.364"
        />
        <path
          stroke="#303030"
          strokeWidth={0.432}
          d="M11.972 13.25C14.053 9.45 17.456 6.87 23.54 7.115c4.41.176 6.97 3.178 8.437 6.226"
        />
        <path
          stroke="#303030"
          strokeWidth={0.432}
          d="M35.342 12.9C32.34 4.8 26.16 3.302 18.708 4.38c-4.616.668-7.523 3.78-9.258 6.645"
        />
        <path
          stroke="#303030"
          strokeWidth={0.432}
          d="M11.407 13.17a.03.03 0 0 1-.028-.025c-.027-.24-.318-2.137-2.472-2.174-2.153-.04-2.94 1.92-3.032 2.175a.03.03 0 0 1-.034.015c-.168-.054-1.114-.298-2.044.5-.929.793-.803 1.912-.768 2.125a.03.03 0 0 1-.03.032c-.222-.009-1.402-.018-1.824.943-.468 1.066.002 2.462 1.416 2.662s10.232.476 11.941.514c1.699.034 1.9-3.22-.183-3.506q-.024-.005-.026-.029c.02-3.035-2.63-3.22-2.916-3.232ZM36.55 14.776a.027.027 0 0 1-.029-.025c-.027-.239-.315-2.137-2.472-2.173-2.154-.04-2.94 1.92-3.031 2.174a.027.027 0 0 1-.035.016c-.168-.052-1.114-.299-2.044.5-.93.793-.802 1.912-.767 2.124.002.018-.011.037-.03.035-.222-.011-1.404-.02-1.826.941-.47 1.063.003 2.461 1.416 2.662 1.415.2 10.233.476 11.941.514 1.699.034 1.9-3.22-.183-3.506-.015-.001-.025-.014-.026-.028.023-3.034-2.629-3.222-2.915-3.234Z"
        />
      </svg>
    );
  },
);
export default SvgRegnbueOutline;
