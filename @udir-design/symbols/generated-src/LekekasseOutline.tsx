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
const SvgLekekasseOutline = forwardRef(
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
        <g clipPath="url(#LekekasseOutline_svg__a)">
          <path
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M4.132 16.138a.8.8 0 0 1 .1-.29l5.028-8.49a.77.77 0 0 1 .473-.353.77.77 0 0 1 .584.08l2.958 1.753M38.441 16.14q.036-.346.036-.702a6.854 6.854 0 0 0-9.814-6.183"
          />
          <path
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M7.02 16.138a10.7 10.7 0 0 1 6.484-4.98l.007-.004.005-.005v-.013c-.076-.203-.757-2.18.397-4.498 1.445-2.75 4.21-3.553 4.425-3.635l.007-.007.003-.01c-.015-.16-.131-1.777.972-1.969 1.108-.19 1.575 1.249 1.617 1.382q0 .006.003.009.005 0 .009.004c.24.04 4.627.804 6.498 3.87q.003.004.009.005.005.003.012.001c.161-.068 1.748-.687 2.195.287.45.987-.94 2.109-1.06 2.203q-.005.003-.006.008v.01c.052.253 1.016 5.149-4.301 7.342"
          />
          <path
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M23.957 12.692c1.17-1.765.449-4.301-1.61-5.667-2.058-1.365-4.677-1.043-5.846.72-1.172 1.766-.451 4.302 1.608 5.668 2.06 1.365 4.677 1.043 5.848-.72Z"
          />
          <path
            fill="#303030"
            d="M20.775 5.016a.513.513 0 1 0 .077 1.023.513.513 0 0 0-.077-1.023M24.823 7.941a.513.513 0 1 0 .078 1.024.513.513 0 0 0-.078-1.024"
          />
          <path
            fill="#303030"
            stroke="#303030"
            strokeWidth={0.1}
            d="m20.864 9.19-1.64 2.47c-.8.202-1.414.15-1.828-.152-.494-.361-.53-.975-.53-.981a.137.137 0 0 0-.143-.13.14.14 0 0 0-.131.143c.001.03.04.746.64 1.187q.52.38 1.352.319.352-.027.76-.134a.14.14 0 0 0 .079-.056l1.674-2.52a1.6 1.6 0 0 0-.233-.145Z"
          />
          <path
            fill="#303030"
            stroke="#303030"
            strokeWidth={0.1}
            d="M20.801 13.712c-.292.022-.608-.015-.887-.181-.476-.284-.727-.872-.746-1.748a.137.137 0 0 1 .274-.006c.016.775.222 1.286.61 1.518.643.384 1.603-.098 1.613-.103a.137.137 0 0 1 .125.244c-.029.014-.471.237-.989.276Z"
          />
          <path
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M20.516 7.094c-.2.011.096 1.903.387 2.168s2.083.398 2.353.172c.27-.225-.997-2.44-2.74-2.34ZM41 16.994a.85.85 0 0 0-.251-.605.87.87 0 0 0-.605-.25H1.856a.86.86 0 0 0-.856.856v.6a.31.31 0 0 0 .309.309h.632q.007 0 .01.003a.02.02 0 0 1 .005.01v18.044c0 1.024.406 2.005 1.13 2.727a3.85 3.85 0 0 0 2.726 1.13H36.1a3.853 3.853 0 0 0 3.856-3.857V17.917q0-.005.004-.01.004-.003.01-.004h.721q.062 0 .118-.024a.3.3 0 0 0 .1-.066.307.307 0 0 0 .091-.22zM1.956 17.918h38"
          />
        </g>
        <defs>
          <clipPath id="LekekasseOutline_svg__a">
            <path fill="#fff" d="M0 0h42v40.818H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgLekekasseOutline;
