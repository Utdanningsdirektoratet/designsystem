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
const SvgFastnkkelOgVernebrillerOutline = forwardRef(
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
    const __srcH = 31;
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
        viewBox="0 0 42 31"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g
          stroke="#303030"
          strokeMiterlimit={10}
          clipPath="url(#Fastn\xF8kkelOgVernebrillerOutline_svg__a)"
        >
          <path
            strokeWidth={0.4}
            d="m32.677 5.433-2.761.866a.56.56 0 0 1-.703-.368l-.694-2.213a.56.56 0 0 1 .368-.703l2.76-.865a3.805 3.805 0 0 0-6.478 2.03L7.479 9.726A3.805 3.805 0 0 0 1 11.756l2.774-.869a.56.56 0 0 1 .703.368l.694 2.213a.56.56 0 0 1-.368.703l-2.773.869a3.805 3.805 0 0 0 6.478-2.03l17.69-5.546a3.805 3.805 0 0 0 6.48-2.03zM40.606 17.578a1.21 1.21 0 0 0-1.348-1.06l-27.681 3.32a1.21 1.21 0 0 0-1.06 1.347s.766 4.563.84 5.046c.313 2.359 3.551 3.907 7.26 3.463 3.145-.378 5.622-2.068 6.148-4.016.09-.337.124-2.631.473-2.673l1.5-.18c.345-.041.918 2.178 1.086 2.483.969 1.771 3.777 2.83 6.924 2.453 3.709-.445 6.488-2.715 6.236-5.081-.042-.59-.378-5.102-.378-5.102Z"
          />
          <path
            strokeWidth={0.4}
            d="M12.191 19.764s4.008-4.966 5.684-6.311c1.31-1.05 3.08-1.198 3.125.552.054 2.14-1.25 2.101-1.094 1.147.165-1.019-.234-1.631-1.736-.174s-2.797 4.405-2.797 4.405l-3.18.38zM38.752 16.579s-5.068-3.878-7.014-4.788c-1.522-.711-3.276-.436-2.906 1.275.453 2.092 1.71 1.746 1.335.856-.402-.95-.159-1.64 1.646-.58s3.758 3.618 3.758 3.618l3.18-.381z"
          />
          <path
            strokeWidth={0.3}
            d="m11.523 19.843 27.791-3.334.103.853a.13.13 0 0 1-.116.139l-27.53 3.302a.13.13 0 0 1-.146-.108l-.102-.851z"
          />
        </g>
        <defs>
          <clipPath id="Fastn\xF8kkelOgVernebrillerOutline_svg__a">
            <path fill="#fff" d="M0 0h42v30.77H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgFastnkkelOgVernebrillerOutline;
