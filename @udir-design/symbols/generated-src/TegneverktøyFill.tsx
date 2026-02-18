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
const SvgTegneverktyFill = forwardRef(
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
    const __srcH = 33;
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
        viewBox="0 0 42 33"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#5BA27E"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m8.469 27.29-2.878-.848s-.009-.006-.009-.008L12.255 3.56l3.02.89L8.48 27.286s-.006.005-.011.003Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="m7.558 27.019-1.074-.317s-.004-.004-.002-.007l6.71-22.862 1.129.332-6.757 22.85s-.003.004-.006.003Z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m5.582 26.45.251 4.48 2.64-3.627s0-.011-.008-.013l-2.871-.846c-.006-.002-.013.001-.013.006z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m5.736 29.017.097 1.914 1.119-1.557z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M14.862 2.004c.576.17.907.776.737 1.353l-.32 1.09-.004.001-3.015-.888-.001-.003.321-1.092c.17-.575.774-.904 1.349-.735z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M33.01 14.202c-5.689-5.516-14.307-3.356-13.376 1.74 2.71 14.84-6.418 11.005-6.418 11.005"
        />
        <circle
          cx={0.345}
          cy={0.345}
          r={0.295}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.1}
          transform="scale(-1 1)rotate(10.349 -94.59 -101.918)"
        />
        <circle
          cx={0.345}
          cy={0.345}
          r={0.295}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.1}
          transform="scale(-1 1)rotate(10.349 -92.095 -176.2)"
        />
        <circle
          cx={0.345}
          cy={0.345}
          r={0.295}
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.1}
          transform="scale(-1 1)rotate(10.349 -152.836 -61.184)"
        />
        <path
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.1}
          d="m22.099 29.577-.238.391.392.238.238-.392zM18.619 10.766l-.237.392.392.237.237-.392zM26.49 7.163l-.237.392.392.237.237-.392z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="m32.875 14.08-6.1-6.488M22.112 29.62l-3.338-18.278"
        />
        <path
          fill="#D3E6F6"
          stroke="#303030"
          strokeWidth={0.4}
          d="m38.855 27.872-3.793.847-.259-1.16c-1.073-.352-2.642-1.43-2.956-2.956-.313-1.527 1.383-5.523 2.336-8.636 2.211 2.47 5.48 5.444 5.788 6.821.308 1.378-.554 3.086-1.375 3.924z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m34.283 16.287 1.386 6.272"
        />
        <circle
          cx={35.847}
          cy={23.343}
          r={0.813}
          stroke="#303030"
          strokeWidth={0.4}
          transform="rotate(-12.592 35.847 23.343)"
        />
      </svg>
    );
  },
);
export default SvgTegneverktyFill;
