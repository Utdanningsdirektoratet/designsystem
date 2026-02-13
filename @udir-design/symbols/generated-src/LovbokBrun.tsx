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
const SvgLovbokBrun = forwardRef(
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
        <mask id="LovbokBrun_svg__a" fill="#fff">
          <path d="M1 2.921C1 1.861 1.86 1 2.921 1h28.547c.53 0 .96.43.96.96v38.08c0 .53-.43.96-.96.96H2.921A1.92 1.92 0 0 1 1 39.079z" />
        </mask>
        <path
          fill="#D6B689"
          d="M1 2.921C1 1.861 1.86 1 2.921 1h28.547c.53 0 .96.43.96.96v38.08c0 .53-.43.96-.96.96H2.921A1.92 1.92 0 0 1 1 39.079z"
        />
        <path
          fill="#303030"
          d="M0 2.921A2.32 2.32 0 0 1 2.321.6h29.147c.751 0 1.36.61 1.36 1.36h-.8a.56.56 0 0 0-.56-.56H2.921C2.412 1.4 2 2.081 2 2.921zM32.829 40.64c0 .75-.61 1.36-1.361 1.36H2.921A2.92 2.92 0 0 1 0 39.079h2c0 .509.412.921.921.921h29.107zM2.92 42A2.92 2.92 0 0 1 0 39.079V2.92A2.32 2.32 0 0 1 2.321.6l.6.8C2.412 1.4 2 2.081 2 2.921V39.08c0 .509.412.921.921.921zM31.468.6c.751 0 1.36.61 1.36 1.36v38.68c0 .75-.609 1.36-1.36 1.36v-2h.56V1.96a.56.56 0 0 0-.56-.56z"
          mask="url(#LovbokBrun_svg__a)"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.768}
          d="M26.853 6.453c-.015-1.251-.954-1.877-1.877-1.564-1.524.516-.953 2.19.298 2.815s2.19 1.42 2.19 2.502c0 .938-.299 1.251-.611 1.564"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeWidth={0.768}
          d="M24.648 7.391c-.625.626-1.25 1.564-.312 2.502.938.939 1.925 1.036 2.502 2.19.469.938 0 1.876-.939 2.189-.938.313-1.876-.626-1.876-1.564"
        />
      </svg>
    );
  },
);
export default SvgLovbokBrun;
