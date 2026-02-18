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
const SvgSprytePlussOgHjerteOutline = forwardRef(
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
    const __srcW = 34;
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
        viewBox="0 0 34 42"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m2.045 18.498 3.882-1.534q.014-.004.017-.001l7.338 18.33-4.076 1.61-7.173-18.395s.005-.007.012-.01ZM7.933 37.407l6.62-2.616a.973.973 0 0 1 1.262.547l.054.138-.001.003-8.421 3.327-.003-.001-.055-.14a.97.97 0 0 1 .544-1.258Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m10.725 37.51 1.87-.736.007-.002.762 1.818-1.964.772-.682-1.849s.096-.038.007-.003ZM10.491 39.739l3.783-1.49a.973.973 0 0 1 1.261.549l-.001.003-5.584 2.198-.003-.001-.001-.002a.97.97 0 0 1 .545-1.258ZM23.729 6.915l-4.978-.449.448-4.978a.19.19 0 0 0-.174-.208L15.932 1a.19.19 0 0 0-.208.175l-.449 4.978-4.978-.449a.193.193 0 0 0-.21.174L9.81 8.971c-.01.107.068.2.174.21l4.978.448-.449 4.978c-.01.105.069.2.174.208l3.093.28c.105.01.2-.07.209-.174l.448-4.978 4.978.448c.106.01.2-.069.21-.174l.279-3.093a.193.193 0 0 0-.174-.21ZM3.454 17.942l1.062-.42-1.04-2.634-1.063.42z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m3.017 21.036 1.437-.567M4.356 24.426l1.436-.567M5.695 27.816l1.436-.567M7.032 31.206l1.437-.567M8.371 34.596l1.437-.567M2.95 15.096 1 10.169"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M31.994 23.802c-.106-1.794-1.691-3.111-3.707-2.887-1.902.212-3.148 2.232-3.148 2.232s-.748-2.253-2.55-2.896c-1.91-.683-3.757.235-4.272 1.957-.71 2.372.592 4.834 1.642 6.978s3.702 6.64 3.702 6.64 3.616-3.765 5.131-5.611c1.514-1.845 3.347-3.94 3.202-6.413Z"
        />
      </svg>
    );
  },
);
export default SvgSprytePlussOgHjerteOutline;
