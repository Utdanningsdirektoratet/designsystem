'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
interface SVGRProps {
  size?: number | string;
}
const SvgMattePPcOutline = forwardRef(
  (
    { size, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    const __srcW = 42;
    const __srcH = 27;
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
        viewBox="0 0 42 27"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        {...props}
      >
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M34.006 1H7.936c-.672 0-1.217.545-1.217 1.218v16.337c0 .673.545 1.218 1.218 1.218h26.07c.672 0 1.217-.545 1.217-1.218V2.218c0-.673-.545-1.218-1.218-1.218Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M33.406 1.609H8.536c-.672 0-1.217.545-1.217 1.218v14.222c0 .673.545 1.218 1.218 1.218h24.87c.672 0 1.217-.545 1.217-1.218V2.827c0-.673-.545-1.218-1.218-1.218Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M41 24.895v.438c0 .162-.13.293-.292.294L1.294 25.7A.293.293 0 0 1 1 25.41v-.438c0-.092.043-.178.116-.234l5.162-3.905.028-.02c.289-.178.62-.273.96-.274l27.455-.052c.335 0 .664.093.95.268q.015.008.029.018l5.183 3.889a.29.29 0 0 1 .117.233z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="M2.12 24.871h37.757M26.561 6.498v1.468h-8.139V6.498zM22.492 3.16a.943.943 0 1 1-.001 1.886.943.943 0 0 1 0-1.885ZM22.492 9.415a.943.943 0 1 1 0 1.886.943.943 0 0 1 0-1.886Z"
        />
        <mask id="MatteP\xE5PcOutline_svg__a" fill="#fff">
          <path d="M14.088 11.567h2.807v1.403h-2.807v2.805h-1.403V12.97H9.879v-1.403h2.806V8.761h1.403z" />
        </mask>
        <path
          fill="#303030"
          d="M14.088 11.567h-.2v.2h.2zm2.807 0h.2v-.2h-.2zm0 1.403v.2h.2v-.2zm-2.807 0v-.2h-.2v.2zm0 2.805v.2h.2v-.2zm-1.403 0h-.2v.2h.2zm0-2.805h.2v-.2h-.2zm-2.806 0h-.2v.2h.2zm0-1.403v-.2h-.2v.2zm2.806 0v.2h.2v-.2zm0-2.806v-.2h-.2v.2zm1.403 0h.2v-.2h-.2zm0 2.806v.2h2.807v-.4h-2.807zm2.807 0h-.2v1.403h.4v-1.403zm0 1.403v-.2h-2.807v.4h2.807zm-2.807 0h-.2v2.805h.4V12.97zm0 2.805v-.2h-1.403v.4h1.403zm-1.403 0h.2V12.97h-.4v2.805zm0-2.805v-.2H9.879v.4h2.806zm-2.806 0h.2v-1.403h-.4v1.403zm0-1.403v.2h2.806v-.4H9.879zm2.806 0h.2V8.761h-.4v2.806zm0-2.806v.2h1.403v-.4h-1.403zm1.403 0h-.2v2.806h.4V8.761z"
          mask="url(#MatteP\xE5PcOutline_svg__a)"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="M32.4 12.916v.867h-5.156v-.867zM32.4 15.317v.867h-5.155v-.867z"
        />
      </svg>
    );
  },
);
export default SvgMattePPcOutline;
