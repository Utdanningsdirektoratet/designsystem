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
const SvgBallongerOutline = forwardRef(
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
    const __srcW = 36;
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
        viewBox="0 0 36 42"
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
          strokeWidth={0.4}
          d="M11.732 12.363c1.012 1.967 2.714 4.43 4.894 4.43 2.054 0 3.637-2.58 4.592-4.575s1.868-6.33.258-9.047c-1.812-3.058-8.13-2.727-10.07 0-1.941 2.728-.91 6.792.326 9.192Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M15.374 17.616c.104-.215.7-.585.986-.744.222-.13.359-.077.51 0 .147.074.788.467.892.83.104.364-.407.165-.571.156-.165-.009-.355-.113-.83.07-.476.18-1.116-.044-.987-.312Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M16.704 17.847c.129 1.564.12 2.689 0 4.03-.15 1.679-1.233 5.352-.556 8.204.678 2.853 1.168 4.476.556 10.919M23.761 18.645c1.012 1.967 2.714 4.43 4.894 4.43 2.054 0 3.637-2.579 4.592-4.574.954-1.996 1.867-6.33.257-9.047-1.811-3.058-8.128-2.728-10.07 0-1.94 2.727-.908 6.791.327 9.191Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M27.403 23.898c.104-.214.7-.585.986-.744.222-.13.359-.077.51 0 .147.075.788.467.892.83.103.364-.407.165-.571.156-.165-.008-.355-.112-.83.07-.477.181-1.117-.044-.987-.312Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M28.733 24.13c-.696 3.537.633 5.24 0 8.362-.583 2.873 0 5.65 0 8.508M2.406 24.052c1.012 1.967 2.714 4.43 4.894 4.43 2.054 0 3.637-2.58 4.591-4.574.955-1.996 1.868-6.33.258-9.048-1.812-3.058-8.129-2.727-10.07 0-1.94 2.728-.909 6.792.327 9.192Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M6.048 29.305c.104-.215.7-.585.986-.744.222-.13.358-.077.51 0 .147.075.787.467.891.83.104.364-.406.165-.57.156-.165-.009-.355-.112-.831.07-.476.18-1.116-.044-.986-.312Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M7.378 29.536c.291 4.154-.999 4.852 0 11.464"
        />
      </svg>
    );
  },
);
export default SvgBallongerOutline;
