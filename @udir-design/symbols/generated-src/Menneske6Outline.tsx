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
const SvgMenneske6Outline = forwardRef(
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
    const __srcW = 32;
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
        viewBox="0 0 32 42"
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
          d="M17.893 12.938c.037.326.126.79.223 1.239m-4.61-1.318c0 .207-.064.768-.16 1.318M5.776 39.005c.173.28.208.483.044.64-.806.77 2.172 1.702 2.51-.253.143-.824.108-1.366-.133-1.715M25.632 39.024c-.292.427-.374.717-.163.917.812.768-2.193 1.704-2.532-.251-.156-.895-.1-1.458.203-1.802"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M11.904 9.793a9 9 0 0 0 1.134 2.603c.79 1.207 4.697 1.268 5.527 0 .358-.547.647-1.346.874-2.216"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M17.23 1.814c-5.235-2.021-4.052.359-5.944.359-.749 0-2.542 6.712.42 8.9.514.379-.237-3.498.66-3.848 1.193-.747.513-2.275 2.329-2.505.875-.11 1.683-.373 2.144-1.062"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M20.06 11.036c-.357.457-.696-1.026-.842-1.76-.315-1.578-.016-2.316-.331-2.977-.503-1.056-2.935-1.406-1.738-4.492 2.782-1.63 3.437 2.557 4.193 3.543.605.788-1.017 5.349-1.281 5.686ZM4.907 38.246l.489.917 3.112-1.657-.488-.917M26.5 38.118l-.456 1.065-3.364-1.487.467-1.064M11.288 14.93l1.404-.098.183-.875 2.836.366 2.824-.366.17.875 1.254.098"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M25.447 16.419c-.905-.307-3.764-1.106-5.237-1.618 0 0-1.949 1.636-4.392 1.618C13.393 16.4 11.12 14.8 11.12 14.8c-2.368.726-4.652 1.19-5.53 1.618-.353.172-3.008 7.258-4.383 11.195-.247.705-.306 1.13 0 1.841.212.495 2.777 8.236 3.055 8.703s3.887-1.27 4.124-1.742c.259-.515-2.955-7.361-2.82-7.854.341-1.24 1.964-4.947 2.484-6.043l1.248 8.838-.912 7.926 6.436.384h1.754l6.268-.384-1.009-7.926 1.215-8.838 2.844 6.043-3.05 7.854c.571.924 4.026 2.125 4.21 1.742.257-.531 2.564-7.607 3.081-8.703.278-.588.222-1.266 0-1.84-1.277-3.315-4.287-11.06-4.69-11.196Z"
        />
      </svg>
    );
  },
);
export default SvgMenneske6Outline;
