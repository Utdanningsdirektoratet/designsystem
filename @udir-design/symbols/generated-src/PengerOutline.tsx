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
const SvgPengerOutline = forwardRef(
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
    const __srcH = 35;
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
        viewBox="0 0 42 35"
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
          d="M10 10.49v.809c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 9.7v.81c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61V9.7"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 8.91v.81c0 .888 1.789 1.61 3.996 1.61s3.995-.722 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 8.128v.809c0 .89 1.789 1.61 3.996 1.61s3.995-.72 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 7.34v.809c0 .89 1.789 1.61 3.996 1.61s3.995-.72 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 6.55v.809c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 5.76v.81c0 .888 1.789 1.61 3.996 1.61s3.995-.722 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 4.978v.81c0 .888 1.789 1.61 3.996 1.61s3.995-.722 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 4.19V5c0 .888 1.789 1.61 3.996 1.61S17.99 5.887 17.99 5v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 3.4v.809c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10 2.61v.81c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M13.996 4.22c2.206 0 3.995-.72 3.995-1.61S16.202 1 13.996 1 10 1.72 10 2.61s1.789 1.61 3.996 1.61ZM1 15.128v.809c0 .89 1.789 1.61 3.996 1.61s3.995-.72 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 14.34v.809c0 .89 1.789 1.61 3.996 1.61s3.995-.72 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 13.55v.808c0 .89 1.789 1.61 3.996 1.61s3.995-.72 3.995-1.61v-.809"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 12.76v.81c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 11.978v.81c0 .888 1.789 1.61 3.996 1.61s3.995-.722 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 11.19V12c0 .888 1.789 1.61 3.996 1.61S8.99 12.887 8.99 12v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 10.4v.809c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M1 9.61v.81c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M4.996 11.22c2.206 0 3.995-.72 3.995-1.61S7.202 8 4.996 8 1 8.72 1 9.61s1.789 1.61 3.996 1.61ZM25 9.128v.809c0 .89 1.789 1.61 3.996 1.61s3.995-.72 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M25 8.34v.809c0 .89 1.789 1.61 3.996 1.61s3.995-.72 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M25 7.55v.809c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M25 6.76v.81c0 .888 1.789 1.61 3.996 1.61s3.995-.722 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M25 5.978v.81c0 .888 1.789 1.61 3.996 1.61s3.995-.722 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M25 5.19V6c0 .888 1.789 1.61 3.996 1.61S32.99 6.887 32.99 6v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M25 4.4v.809c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M25 3.61v.81c0 .889 1.789 1.61 3.996 1.61s3.995-.721 3.995-1.61v-.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M28.996 5.22c2.206 0 3.995-.72 3.995-1.61S31.202 2 28.996 2 25 2.72 25 3.61s1.789 1.61 3.996 1.61ZM1 21.14v5.976l18.47 6.17L41 20.17v-4.711"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 26.475 18.45 6.092 5.387-3.219 2.694-1.61 1.347-.804.337-.2M41 19.691l-5.388 3.219-1.346.805-.674.402-.168.1"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 25.777 18.45 6.065 5.387-3.156 2.694-1.578 1.347-.79.337-.196M41 19.217l-5.388 3.156-1.346.79-.674.394"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 25.078 18.45 6.032L24.837 28l2.694-1.553 1.347-.778.337-.194M41 18.675l-5.388 3.109-1.346.777-.674.388"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 24.408 18.45 6 5.387-3.07 2.694-1.536 1.347-.767.337-.192M41 18.126l-5.388 3.07-1.346.768-.674.384"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 23.757 18.45 5.958 5.387-3.032 2.694-1.515 1.347-.758.337-.19M41 17.59l-5.388 3.03-1.346.758-.674.38"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 23.114 18.45 5.888 5.387-2.999 2.694-1.5 1.347-.749.337-.187M41 17.007l-5.388 2.999-1.346.75-.674.374"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 22.438 18.45 5.785 5.387-2.942 2.694-1.47 1.347-.736.337-.184M41 16.455l-5.388 2.942-1.346.736-.674.368"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 21.821 18.45 5.685 5.387-2.893 2.694-1.446 1.347-.723.505-.271M41 15.936l-5.388 2.892-1.346.723-.674.362"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m33.593 19.232 7.382-3.89a.01.01 0 0 0-.003-.02L23.804 12 1.027 21.13a.01.01 0 0 0 0 .018l18.426 5.536 9.764-5.146"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m26.586 22.81-3.862 2.036-17.855-5.15 3.975-1.593z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m29.262 27.321 4.193-2.556.163-5.46-17.28-4.313-4.689 1.88 17.642 4.686z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.215}
          d="m19.02 21.525.608.078-1.669 1.047M22.286 22.406c-.406-.134-.907.147-1.183.375-.259.212-.539.698-.162.796.428.112.784-.162 1.143-.411.36-.25.562-.639.201-.758zM20.753 21.89c-.406-.134-.907.148-1.183.375-.259.212-.539.698-.162.797.428.111.784-.162 1.143-.412.36-.25.562-.638.201-.758zM23.84 22.851c-.406-.134-.907.147-1.183.375-.259.212-.539.698-.162.796.428.112.784-.162 1.143-.411.36-.25.562-.639.201-.758z"
        />
      </svg>
    );
  },
);
export default SvgPengerOutline;
