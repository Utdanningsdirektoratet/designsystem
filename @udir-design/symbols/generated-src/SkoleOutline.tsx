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
const SvgSkoleOutline = forwardRef(
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
    const __srcH = 23;
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
        viewBox="0 0 42 23"
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
          d="M31.708 4.35H10.292v17.372h21.416zM10.291 8.435H1.883v13.287h8.408zM40.116 8.43h-8.408v13.287h8.408zM32.179 4.35H9.82L11.79 1h18.42zM41 8.43h-9.292V5.768h7.98z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M10.292 8.43H1l1.312-2.662h7.98zM21 9.21a1.473 1.473 0 1 0 0-2.945 1.473 1.473 0 0 0 0 2.945ZM24.274 15.169h-6.548v6.548h6.548zM29.04 16.323h-2.098v3.256h2.098zM15.058 16.323H12.96v3.256h2.098zM15.058 8.606H12.96v3.256h2.098zM29.04 8.606h-2.098v3.256h2.098zM7.137 13.486H5.04v3.256h2.098zM36.961 13.396h-2.098v3.256h2.098z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M21 15.169v6.549M20.296 7.516l.704.221v-.935"
        />
      </svg>
    );
  },
);
export default SvgSkoleOutline;
