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
const SvgKornaksFill = forwardRef(
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
    const __srcW = 18;
    const __srcH = 42;
    const __isWide = false;
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
        viewBox="0 0 18 42"
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
          strokeWidth={0.4}
          clipPath="url(#KornaksFill_svg__a)"
        >
          <path
            fill="#F2E8DA"
            d="M8.907 35.803c2.325-1.098 2.935-.867 4.66-1.787 0 0-.219 3.788-2.023 4.78-2.5 1.377-3.469 1.32-4.847 2.204 0-1.693.524-4.4 2.21-5.197Z"
          />
          <path
            fill="#E5CEAE"
            d="M5.9 40.886s.977-4.146-.678-5.604c-1.928-1.7-2.58-1.649-3.98-3.012 0 0-.842 3.7.616 5.155 2.021 2.015 2.965 2.232 4.043 3.461ZM9.774 30.025c2.325-1.098 2.935-.867 4.66-1.787 0 0-.219 3.788-2.023 4.78-2.501 1.376-3.47 1.32-4.847 2.204 0-1.693.524-4.4 2.21-5.197Z"
          />
          <path
            fill="#F2E8DA"
            d="M6.767 35.108s.977-4.146-.678-5.604c-1.928-1.7-2.58-1.65-3.98-3.012 0 0-.842 3.7.616 5.155 2.021 2.015 2.965 2.232 4.042 3.461ZM10.533 24.205c2.325-1.098 2.935-.866 4.66-1.787 0 0-.219 3.788-2.023 4.78-2.5 1.377-3.469 1.32-4.847 2.204 0-1.693.524-4.4 2.21-5.197Z"
          />
          <path
            fill="#E5CEAE"
            d="M7.529 29.29s.976-4.145-.679-5.604c-1.928-1.7-2.58-1.648-3.98-3.012 0 0-.842 3.701.616 5.156 2.022 2.015 2.965 2.232 4.043 3.46ZM11.338 18.442c2.325-1.099 2.935-.867 4.66-1.788 0 0-.219 3.788-2.023 4.782-2.501 1.375-3.47 1.32-4.847 2.203 0-1.693.524-4.4 2.21-5.197Z"
          />
          <path
            fill="#F2E8DA"
            d="M8.331 23.525s.977-4.146-.678-5.604c-1.928-1.7-2.58-1.65-3.98-3.013 0 0-.842 3.702.616 5.156 2.021 2.015 2.965 2.232 4.042 3.46Z"
          />
          <path
            fill="#E5CEAE"
            d="M12.14 12.711c2.326-1.098 2.936-.867 4.661-1.787 0 0-.22 3.788-2.023 4.78-2.501 1.377-3.47 1.32-4.847 2.204 0-1.687.53-4.402 2.21-5.197Z"
          />
          <path
            fill="#F2E8DA"
            d="M9.134 17.794s.977-4.146-.678-5.604c-1.928-1.7-2.58-1.649-3.98-3.012 0 0-.843 3.7.616 5.155 2.021 2.015 2.964 2.232 4.042 3.461Z"
          />
          <path
            fill="#E5CEAE"
            d="M10.647 12.438s-.007-3.275 1.348-4.1c1.58-.964 2.013-.817 3.182-1.616 0 0-.014 2.917-1.235 3.774-1.692 1.185-2.367 1.193-3.296 1.942ZM9.887 12.335s.925-3.14-.145-4.314c-1.245-1.367-1.702-1.349-2.6-2.443 0 0-.805 2.803.128 3.968 1.291 1.612 1.939 1.81 2.617 2.789ZM12.177 1s-1.735 1.287-2.03 3.364c-.293 2.077.649 3.689.649 3.689s1.787-.861 2.126-3.211c.257-1.775-.32-3.019-.745-3.842Z"
          />
        </g>
        <defs>
          <clipPath id="KornaksFill_svg__a">
            <path fill="#fff" d="M0 0h17.801v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgKornaksFill;
