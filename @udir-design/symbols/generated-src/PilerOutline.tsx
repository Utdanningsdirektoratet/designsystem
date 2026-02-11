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
const SvgPilerOutline = forwardRef(
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
    const __srcH = 13;
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
        viewBox="0 0 42 13"
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
          clipPath="url(#PilerOutline_svg__a)"
        >
          <path d="m14.866 5.949-2.384-4.896c-.045-.094-.162-.055-.162.056v.999c0 .06-.039.109-.088.109H1.088c-.068 0-.11.094-.075.166L2.75 5.949a.13.13 0 0 1 0 .114L1.013 9.629c-.035.072.007.166.075.166h11.144c.05 0 .088.048.088.109v.998c0 .111.117.15.162.057l2.384-4.896a.13.13 0 0 0 0-.114ZM40.987 5.949l-2.384-4.896c-.045-.094-.162-.055-.162.056v.999c0 .06-.039.109-.088.109H27.21c-.068 0-.11.094-.075.166l1.737 3.566a.13.13 0 0 1 0 .114l-1.737 3.566c-.035.072.007.166.075.166h11.144c.05 0 .088.048.088.109v.998c0 .111.117.15.162.057l2.384-4.896a.13.13 0 0 0 0-.114Z" />
          <path d="m27.926 5.949-2.383-4.896c-.046-.094-.163-.055-.163.056v.999c0 .06-.038.109-.087.109H14.148c-.068 0-.11.094-.075.166l1.737 3.566a.13.13 0 0 1 0 .114l-1.737 3.566c-.035.072.007.166.075.166h11.145c.049 0 .087.048.087.109v.998c0 .111.117.15.163.057l2.383-4.896a.13.13 0 0 0 0-.114Z" />
        </g>
        <defs>
          <clipPath id="PilerOutline_svg__a">
            <path fill="#fff" d="M0 0h42v12.011H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgPilerOutline;
