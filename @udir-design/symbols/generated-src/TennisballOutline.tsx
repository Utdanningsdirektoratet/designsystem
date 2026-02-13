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
const SvgTennisballOutline = forwardRef(
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
    const __srcH = 42;
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
        viewBox="0 0 42 42"
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
          d="M21 41c11.046 0 20-8.954 20-20S32.046 1 21 1 1 9.954 1 21s8.954 20 20 20Z"
        />
        <path
          fill="#303030"
          d="M38.407 11.301c-1.509-1.124-3.011-.035-3.899 1.3-.522.837-.819 1.754-1.149 2.712-.839 2.693-2.006 5.456-3.773 7.727-2.737 3.55-7.16 6.984-11.642 7.806-6.518 1.328-12.756-2.938-14.496-9.242-.537-2.094-.561-4.33-.168-6.445.537-2.806 1.924-5.368 3.64-7.607C7.775 6.44 8.71 5.4 9.672 4.392l.166.149c-.895 1.06-1.76 2.147-2.534 3.288-1.542 2.247-2.758 4.775-3.133 7.48-.574 3.972.586 8.167 3.575 10.904 1.857 1.797 4.35 2.95 6.941 3.046 3.289.15 6.341-1.46 8.84-3.492 1.56-1.232 3.04-2.586 4.308-4.118 1.294-1.527 2.321-3.239 3.186-5.046.621-1.264 1.13-2.565 1.882-3.8.652-1.047 1.607-1.977 2.778-2.406l.138-.05.145-.034c.097-.023.194-.047.291-.064.481-.054 1.01 0 1.44.211.342.17.64.39.88.692l-.167.15z"
        />
      </svg>
    );
  },
);
export default SvgTennisballOutline;
