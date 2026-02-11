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
const SvgPengerFill = forwardRef(
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
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 11.299c0 .889-1.789 1.61-3.995 1.61S10 12.188 10 11.299v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 10.51c0 .889-1.789 1.61-3.995 1.61S10 11.399 10 10.51V9.7h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 9.72c0 .888-1.789 1.61-3.995 1.61S10 10.607 10 9.72v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 8.937c0 .89-1.789 1.61-3.995 1.61S10 9.827 10 8.937v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 8.149c0 .89-1.789 1.61-3.995 1.61S10 9.04 10 8.15v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 7.359c0 .889-1.789 1.61-3.995 1.61S10 8.248 10 7.359v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 6.57c0 .888-1.789 1.61-3.995 1.61S10 7.457 10 6.57v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 5.787c0 .89-1.789 1.61-3.995 1.61S10 6.677 10 5.787v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 5c0 .888-1.789 1.61-3.995 1.61S10 5.887 10 5v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 4.209c0 .889-1.789 1.61-3.995 1.61S10 5.098 10 4.209v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.991 3.42c0 .889-1.789 1.61-3.995 1.61S10 4.309 10 3.42v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M13.996 4.22c2.206 0 3.995-.72 3.995-1.61S16.202 1 13.996 1 10 1.72 10 2.61s1.789 1.61 3.996 1.61Z"
        />
        <path
          fill="#D6B689"
          d="M13.987 3.568c1.69 0 3.058-.448 3.058-1s-1.369-1-3.058-1-3.058.448-3.058 1 1.37 1 3.058 1"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 15.937c0 .89-1.789 1.61-3.995 1.61S1 16.827 1 15.937v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 15.149c0 .89-1.789 1.61-3.995 1.61S1 16.04 1 15.15v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 14.359c0 .889-1.789 1.61-3.995 1.61S1 15.248 1 14.359v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 13.57c0 .889-1.789 1.61-3.995 1.61S1 14.459 1 13.57v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 12.787c0 .89-1.789 1.61-3.995 1.61S1 13.677 1 12.787v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 12c0 .888-1.789 1.61-3.995 1.61S1 12.887 1 12v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 11.209c0 .889-1.789 1.61-3.995 1.61S1 12.098 1 11.209v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.991 10.42c0 .889-1.789 1.61-3.995 1.61S1 11.309 1 10.42v-.81h7.991z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M4.996 11.22c2.206 0 3.995-.72 3.995-1.61S7.202 8 4.996 8 1 8.72 1 9.61s1.789 1.61 3.996 1.61Z"
        />
        <path
          fill="#BED5E8"
          d="M4.99 10.525c1.689 0 3.058-.447 3.058-1s-1.37-1-3.058-1c-1.69 0-3.058.448-3.058 1 0 .553 1.369 1 3.058 1"
        />
        <path
          fill="#A9DBC2"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 21.14 40-5.682v4.71L19.47 33.288 1 27.117z"
        />
        <path fill="#A9DBC2" d="m1 26.475 18.45 6.092L41 19.692" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 26.475 18.45 6.092L41 19.692"
        />
        <path fill="#A9DBC2" d="m1 25.777 18.45 6.065L41 19.217" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 25.777 18.45 6.065L41 19.217"
        />
        <path fill="#A9DBC2" d="m1 25.078 18.45 6.032L41 18.675" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 25.078 18.45 6.032L41 18.675"
        />
        <path fill="#A9DBC2" d="m1 24.408 18.45 6L41 18.127" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 24.408 18.45 6L41 18.127"
        />
        <path fill="#A9DBC2" d="m1 23.757 18.45 5.958L41 17.589" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 23.757 18.45 5.958L41 17.589"
        />
        <path fill="#A9DBC2" d="m1 23.114 18.45 5.888L41 17.007" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 23.114 18.45 5.888L41 17.007"
        />
        <path fill="#A9DBC2" d="m1 22.438 18.45 5.785L41 16.455" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 22.438 18.45 5.785L41 16.455"
        />
        <path fill="#A9DBC2" d="m1 21.821 18.45 5.685L41 15.936" />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m1 21.821 18.45 5.685L41 15.936"
        />
        <path
          fill="#A9DBC2"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M40.972 15.323a.01.01 0 0 1 .003.018L19.453 26.685 1.027 21.148a.01.01 0 0 1 0-.018L23.804 12z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m26.586 22.81-3.862 2.036-17.855-5.15 3.975-1.593z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.215}
          d="m18.963 21.54.607.078-1.67 1.048M22.227 22.422c-.405-.135-.906.147-1.182.375-.259.211-.54.698-.162.796.427.111.784-.162 1.143-.412.36-.25.562-.638.201-.757zM20.694 21.906c-.405-.134-.906.147-1.182.375-.259.212-.54.698-.162.796.427.112.784-.162 1.143-.411.36-.25.562-.639.201-.758zM23.781 22.867c-.405-.135-.906.147-1.182.375-.259.211-.54.698-.163.796.428.111.785-.162 1.144-.412.36-.25.562-.638.201-.757z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m29.262 27.321 4.193-2.556.163-5.46-17.28-4.313-4.689 1.88 17.642 4.686z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 9.937c0 .89-1.789 1.61-3.995 1.61S25 10.827 25 9.937v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 9.149c0 .89-1.789 1.61-3.995 1.61S25 10.04 25 9.15v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 8.359c0 .889-1.789 1.61-3.995 1.61S25 9.248 25 8.359v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 7.57c0 .888-1.789 1.61-3.995 1.61S25 8.457 25 7.57v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 6.787c0 .89-1.789 1.61-3.995 1.61S25 7.677 25 6.787v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 6c0 .888-1.789 1.61-3.995 1.61S25 6.887 25 6v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 5.209c0 .889-1.789 1.61-3.995 1.61S25 6.098 25 5.209v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M32.991 4.42c0 .889-1.789 1.61-3.995 1.61S25 5.309 25 4.42v-.81h7.991z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M28.996 5.22c2.206 0 3.995-.72 3.995-1.61S31.202 2 28.996 2 25 2.72 25 3.61s1.789 1.61 3.996 1.61Z"
        />
        <path
          fill="#D6B689"
          d="M28.99 4.525c1.689 0 3.058-.447 3.058-1s-1.37-1-3.058-1c-1.69 0-3.058.448-3.058 1 0 .553 1.369 1 3.058 1"
        />
      </svg>
    );
  },
);
export default SvgPengerFill;
