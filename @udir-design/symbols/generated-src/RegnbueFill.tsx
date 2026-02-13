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
const SvgRegnbueFill = forwardRef(
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
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M4.877 13.783s1.552-6.966 8.037-10.204 13.401-3.712 19.414.227 6.295 13.532 6.295 13.532l-8.29.58c-4.309-14.486-16.346-3.53-17.869-.52z"
        />
        <path
          fill="#536D81"
          stroke="#303030"
          strokeWidth={0.4}
          d="M32.693 17.753C31.64 14.438 28.89 8.806 22.42 9.096c-7.322.327-10.081 5.11-10.89 6.998l3.678 1.278c2.192-4.34 6.3-5.138 9.334-3.688 3.032 1.451 3.424 4.4 3.424 4.4z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M22.514 6.268c-10.464.538-13.174 6.495-13.84 8.835l4.135 1.436c1.298-2.533 4.034-6.038 9.204-5.948 5.557.096 7.813 4.539 8.682 7.298l4.323-.302C34.59 13.79 32.504 5.753 22.514 6.268Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M18.708 4.38c-6.73.974-9.828 7.143-10.955 10.17l3.13 1.086c1.93-5.056 5.37-8.816 12.656-8.521 6.675.266 9.11 7.008 9.938 10.58l3.087-.214C34.35 5.367 27.394 3.125 18.708 4.379Z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          d="M11.407 13.17a.03.03 0 0 1-.028-.025c-.027-.24-.318-2.137-2.472-2.174-2.153-.04-2.94 1.92-3.032 2.175a.03.03 0 0 1-.034.015c-.168-.054-1.114-.298-2.044.5-.929.793-.803 1.912-.768 2.125a.03.03 0 0 1-.03.032c-.222-.009-1.402-.018-1.824.943-.468 1.066.002 2.462 1.416 2.662s10.232.476 11.941.514c1.699.034 1.9-3.22-.183-3.506q-.024-.005-.026-.029c.02-3.035-2.63-3.22-2.916-3.232ZM36.55 14.776a.027.027 0 0 1-.029-.025c-.027-.239-.315-2.137-2.472-2.173-2.154-.04-2.94 1.92-3.031 2.174a.027.027 0 0 1-.035.016c-.168-.052-1.114-.299-2.044.5-.93.793-.802 1.912-.767 2.124.002.018-.011.037-.03.035-.222-.011-1.404-.02-1.826.941-.47 1.063.003 2.461 1.416 2.662 1.415.2 10.233.476 11.941.514 1.699.034 1.9-3.22-.183-3.506-.015-.001-.025-.014-.026-.028.023-3.034-2.629-3.222-2.915-3.234Z"
        />
      </svg>
    );
  },
);
export default SvgRegnbueFill;
