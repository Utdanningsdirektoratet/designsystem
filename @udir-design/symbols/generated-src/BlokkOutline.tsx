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
const SvgBlokkOutline = forwardRef(
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
    const __srcW = 32;
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
        viewBox="0 0 32 42"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M30.255 1H1v40h29.255z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M20.1 32.05h-8.944v8.944H20.1zM15.628 32.05v8.944M7.88 5.154H4.684V9.57H7.88zM12.997 5.154H9.896v8.975h3.101z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M13.652 14.13H3.32v-3.527h10.333z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M7.752 10.603v3.527M6.282 10.603v3.527M4.814 10.603v3.527M9.22 10.603v3.527M12.157 10.603v3.527M10.688 10.603v3.527"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M7.88 18.373H4.684v4.415H7.88zM12.997 18.373H9.896v8.975h3.101z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M13.652 27.348H3.32V23.82h10.333z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M7.752 23.821v3.527M6.282 23.821v3.527M4.814 23.821v3.527M9.22 23.821v3.527M12.157 23.821v3.527M10.688 23.821v3.527"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M23.375 9.57h3.196V5.155h-3.196zM18.258 14.13h3.101V5.155h-3.101z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.603 14.13h10.334v-3.527H17.603z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M23.505 10.603v3.527M24.973 10.603v3.527M26.44 10.603v3.527M22.035 10.603v3.527M19.1 10.603v3.527M20.567 10.603v3.527"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M23.375 36.465h3.196V32.05h-3.196zM4.685 36.465h3.196V32.05H4.685zM23.375 22.787h3.196v-4.415h-3.196zM18.258 27.348h3.101v-8.975h-3.101z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.603 27.348h10.334V23.82H17.603z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M23.505 23.821v3.527M24.973 23.821v3.527M26.44 23.821v3.527M22.035 23.821v3.527M19.1 23.821v3.527M20.567 23.821v3.527"
        />
      </svg>
    );
  },
);
export default SvgBlokkOutline;
