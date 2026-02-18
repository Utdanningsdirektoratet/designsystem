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
const SvgMenneske7Outline = forwardRef(
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
    const __srcH = 40;
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
        viewBox="0 0 42 40"
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
          strokeWidth={0.395}
          d="M24.314 14.64c.247-.259.562-1.891.562-2.296m4.646 2.41c-.112-.31-.316-1.68-.402-2.41M12.617 34.117c-1.561 1.094-2.423 2.347-3.285 1.35-1.506-1.74-.493-2.203.431-2.704-.485.106-1.012-1.385-.431-1.164.244.093.808.622 1.555.175"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M23.446 9.64c.242.833.585 1.761.944 2.31.76 1.16 4.513 1.218 5.31 0 .402-.612.711-1.551.944-2.545"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M28.419 1.782c-5.032-1.942-3.894.345-5.713.345-.719 0-1.765 5.114-2.528 6.03-.393.47 1.823 3.173 2.685 2.836 1.146-.718.361-5.84 2.106-6.06.774-.098 1.717-.529 2.424-1.207"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M31.37 2.32c.808.658 2.469 5.933 2.732 6.241.391.46-2.915 3.112-3.218 2.476-.483-1.014.22-6.394-3.288-7.173-.954-.212.85-1.66.85-2.078 0-.611 2.318.041 2.924.534ZM22.527 14.373l1.53-.082s.896 1.667 2.89 1.611c1.993-.055 2.889-1.611 2.889-1.611l1.446.07"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M38.952 30.17s.096 1.516.096 2.346m-1.372-10.55c-.584-3.199-1.18-6.088-1.363-6.15-.869-.295-3.616-1.063-5.032-1.555 0 0-1.977 6.095-4.325 6.077-2.33-.017-4.408-6.077-4.408-6.077-2.276.698-4.47 1.143-5.313 1.555-.34.165-1.24 5.992-2.561 9.776-.237.677-3.387 5.136-3.764 5.56s1.475 3.188 2.08 3.188c.603 0 5.607-6.236 5.853-7.13.327-1.19.755-3.87.755-5.533l.323 8.982-1.078 7.126 6.194.37h2.753l6.023-.37-.51-3.963m.915-10.779-.207-1.366-.174 1.366"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M38.603 31.749 41 20.766l-6.38 2.265-8.29-.312-2.128 11.171 8.26.302 1.536-.61.767-.306M36.274 24.746l2.77-1.016M36.045 25.991l2.795-1.067M35.969 27.185l2.643-.99"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M37.618 31.566c-.632-.6-1.444-2.445-1.659-2.144-.214.3-.253.713-.02 1.152-.732-.755-2.405-2.46-3.09-.322-.307.954 1.187 2.397 2.419 3.37"
        />
        <path
          fill="#303030"
          d="M11.454 37.465a.198.198 0 0 0 .353-.178l-.177.09zm-.816-2.066-.177.089.993 1.977.176-.089.177-.089-.992-1.977z"
        />
        <path
          fill="#303030"
          d="M2.583 18.616a.198.198 0 1 0-.355.175l.178-.087zm-.177.088-.178.087 8.32 16.887.177-.087.178-.088-8.32-16.887z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M34.903 33.99c.101.376 1.35.951 1.58.97 2.115.166 2.887-2.155 2.447-3.034l-1.22-.45z"
        />
      </svg>
    );
  },
);
export default SvgMenneske7Outline;
