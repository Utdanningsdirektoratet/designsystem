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
const SvgMenneske6Fill = forwardRef(
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
          fill="#ECDBC2"
          stroke="#303030"
          strokeWidth={0.4}
          d="M15.85 18.357c-1.537.014-3.359-2.4-2.867-2.915.257-.27.562-2.434.562-2.856 0-.572 4.364-.414 4.412 0 .089.76.387 2.627.504 2.95.164.456-1.113 2.806-2.61 2.82ZM5.82 39.645c.314-.3-.1-.766-.812-1.63.822-.166 2.137-1.106 2.908-.608.484.313.6.908.414 1.985-.338 1.955-3.316 1.022-2.51.253ZM25.47 39.94c-.317-.3.024-.8.744-1.664-.83-.165-2.08-1.07-2.857-.572-.49.313-.607.909-.42 1.986.34 1.955 3.344 1.02 2.532.25Z"
        />
        <path
          fill="#ECDBC2"
          stroke="#303030"
          strokeWidth={0.4}
          d="M13.038 12.396c-1.208-1.846-1.767-6.117-1.767-7.105-.054-1.242 2.108-3.226 4.5-3.226 2.185 0 4.376 1.796 4.376 3.226 0 .982-.43 5.345-1.582 7.105-.83 1.268-4.736 1.207-5.527 0Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeWidth={0.4}
          d="M11.707 11.072c.513.38-.238-3.497.66-3.847 1.192-.747.512-2.275 2.327-2.505 1.42-.179 2.661-.759 2.536-2.906-5.235-2.021-4.052.359-5.944.359-.749 0-2.542 6.712.42 8.9Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeWidth={0.4}
          d="M20.06 11.036c-.357.457-.696-1.026-.842-1.759-.315-1.579-.016-2.317-.331-2.978-.503-1.056-2.935-1.406-1.738-4.492 2.782-1.63 3.437 2.557 4.193 3.543.605.788-1.017 5.349-1.281 5.686Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="m5.04 38.071 2.76-1.469.437.82-2.76 1.47zM26.36 37.973l-2.998-1.326-.418.947 2.998 1.325zM18.508 14.87l.03.154.157.008 1.687.087v13.239h-9.44V15.12l1.76-.088.154-.007.031-.152.146-.694 2.653.343.025.003.026-.003 2.637-.343z"
        />
        <path
          fill="#6D889D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M25.447 16.419c-.905-.307-3.764-1.106-5.237-1.618 0 0-1.949 1.636-4.392 1.618C13.393 16.4 11.12 14.8 11.12 14.8c-2.368.726-4.652 1.19-5.53 1.618-.353.172-3.008 7.258-4.383 11.195-.247.705-.306 1.13 0 1.841.212.495 2.777 8.236 3.055 8.703s3.887-1.27 4.124-1.742c.259-.515-2.955-7.361-2.82-7.854.341-1.24 1.964-4.947 2.484-6.043l1.248 8.838-.912 7.926 6.436.384h1.754l6.268-.384-1.009-7.926 1.215-8.838 2.844 6.043-3.05 7.854c.571.924 4.026 2.125 4.21 1.742.257-.531 2.564-7.607 3.081-8.703.278-.588.222-1.266 0-1.84-1.277-3.315-4.287-11.06-4.69-11.196Z"
        />
      </svg>
    );
  },
);
export default SvgMenneske6Fill;
