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
const SvgLekekasseFill = forwardRef(
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
    const __srcH = 41;
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
        viewBox="0 0 42 41"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g clipPath="url(#LekekasseFill_svg__a)">
          <path
            fill="#ECDBC2"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="m12.51 21.648-8.006-4.744a.77.77 0 0 1-.272-1.056l5.028-8.49a.77.77 0 0 1 .473-.353.77.77 0 0 1 .584.08l8.008 4.744a.78.78 0 0 1 .353.473.77.77 0 0 1-.082.584l-5.029 8.49a.8.8 0 0 1-.199.227.764.764 0 0 1-.574.146.7.7 0 0 1-.283-.1Z"
          />
          <path
            fill="#76C69D"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M31.623 22.292a6.854 6.854 0 1 0 0-13.707 6.854 6.854 0 0 0 0 13.707Z"
          />
          <path
            fill="#7F99AE"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M6.603 16.976c.002-.002 1.666-4.373 6.901-5.818l.007-.004.005-.005v-.013c-.076-.203-.757-2.18.397-4.498 1.445-2.75 4.21-3.553 4.425-3.635l.007-.007.003-.01c-.015-.16-.131-1.777.972-1.969 1.108-.19 1.575 1.249 1.617 1.382q0 .006.003.009.005 0 .009.004c.24.04 4.627.804 6.498 3.87q.003.004.009.005.005.003.012.001c.161-.068 1.748-.687 2.195.287.45.987-.94 2.109-1.06 2.203q-.005.003-.006.008v.01c.055.263 1.094 5.546-4.967 7.591q-.006.001-.01.01-.003.004 0 .011c.135.467 3.188 11.397-7.843 14.31C4.511 33.693 4.65 21.454 6.603 16.976Z"
          />
          <path
            fill="#BED5E8"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M23.957 12.692c1.17-1.765.449-4.301-1.61-5.667-2.058-1.366-4.677-1.043-5.846.72-1.172 1.765-.451 4.302 1.608 5.668 2.06 1.365 4.677 1.043 5.848-.72Z"
          />
          <path
            fill="#303030"
            d="M20.775 5.016a.513.513 0 1 0 .077 1.023.513.513 0 0 0-.077-1.023M24.823 7.941a.513.513 0 1 0 .078 1.024.513.513 0 0 0-.078-1.024"
          />
          <path
            fill="#303030"
            stroke="#303030"
            strokeWidth={0.1}
            d="M18.584 12.046q-.833.062-1.352-.32c-.6-.44-.639-1.156-.64-1.186a.14.14 0 0 1 .13-.143.137.137 0 0 1 .143.13c0 .006.037.62.531.981.414.303 1.028.354 1.828.152l1.793-2.7a.137.137 0 1 1 .228.152l-1.822 2.743a.14.14 0 0 1-.08.057 4.3 4.3 0 0 1-.76.134Z"
          />
          <path
            fill="#303030"
            stroke="#303030"
            strokeWidth={0.1}
            d="M20.801 13.712c-.292.022-.608-.015-.887-.181-.476-.284-.727-.872-.746-1.748a.137.137 0 1 1 .274-.006c.017.775.222 1.286.61 1.518.643.384 1.603-.098 1.613-.103a.137.137 0 0 1 .125.244c-.029.014-.471.237-.989.276Z"
          />
          <path
            fill="#303030"
            d="M20.516 7.094c-.2.011.096 1.903.387 2.168s2.083.398 2.353.172c.27-.225-.997-2.44-2.74-2.34"
          />
          <path
            fill="#BFA687"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M41 16.994a.85.85 0 0 0-.251-.605.87.87 0 0 0-.605-.25H1.856a.86.86 0 0 0-.856.856v.6a.31.31 0 0 0 .309.309h.632q.007 0 .01.003a.02.02 0 0 1 .005.01v18.044c0 1.024.406 2.005 1.13 2.727a3.85 3.85 0 0 0 2.726 1.13H36.1a3.853 3.853 0 0 0 3.856-3.857V17.917q0-.005.004-.01.004-.003.01-.004h.721q.062 0 .118-.024a.3.3 0 0 0 .1-.066.307.307 0 0 0 .091-.22z"
          />
          <path
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M1.956 17.918h38"
          />
        </g>
        <defs>
          <clipPath id="LekekasseFill_svg__a">
            <path fill="#fff" d="M0 0h42v40.817H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgLekekasseFill;
