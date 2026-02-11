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
const SvgHolderHenderOutline = forwardRef(
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
    const __srcW = 41;
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
        viewBox="0 0 41 42"
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
          d="M18.042 18.523c-.314-.574-.64-1.152-.957-1.734L9.789 1 1 4.498s6.918 11.136 9.524 16.837c.191.418.398.878.617 1.36M10.16 25.776a179 179 0 0 1-1.675 1.578c-1.073.983-.558 4.725.505 4.915.426.076.87-.14 1.271-.483"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M20.97 40.207c-.71.738-1.38.976-2.362.65-.89-.297-.969-1.334.252-3.352 0 0-1.68 2.37-2.995 2.136-1.548-.665-1.871-1.297-1.19-2.143.622-.773 1.47-1.987 1.47-1.987s-1.257 1.755-2.932.893c-1.495-1.126-.975-1.804.144-3.262l.002-.004s-1.964 2.436-2.782-.233c-1.176-3.841-.415-3.758 0-4.797.416-1.039-.769-2.393-.688-3.58.08-1.185 1.515-1.618 3.324-4.137 1.34-1.867 4.75-1.632 7.25-2.235 1.783-.43 2.612-1.951 2.612-1.951L32.806 1.86l6.707 4.997s-9.047 14.247-10.552 16.88c-.676 1.185-.836 2.989-1.964 5.962"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m21.726 37.124 1.032.84c.675.55.849 1.454.388 2.02l-.142.174c-.46.565-1.38.578-2.057.028l-1.032-.84c-.675-.55-1.27-1.6-1.023-2.3.268-.757 1.607-.955 2.833.077ZM23.963 31.162l3.34 2.26c.587.432.672 1.477.146 2.028-.525.55-1.259.712-1.846.28l-3.265-2.204c-.587-.432-1.756-1.699-.955-2.623.707-.817 2.58.26 2.58.26ZM22.24 33.692l3.253 2.396c.602.443.89 1.338.503 1.863l-.3.408c-.387.525-1.302.48-1.904.037L20.54 36c-.601-.443-1.841-1.845-1.126-2.737.408-.508 2.225-.014 2.826.429ZM26.34 29.437l2.037.882c.615.266.898.982.631 1.597l-.098.229a1.214 1.214 0 0 1-1.597.631l-2.037-.882c-.615-.266-1.421-.906-1.264-1.712.18-.92 1.713-1.012 2.328-.745Z"
        />
      </svg>
    );
  },
);
export default SvgHolderHenderOutline;
