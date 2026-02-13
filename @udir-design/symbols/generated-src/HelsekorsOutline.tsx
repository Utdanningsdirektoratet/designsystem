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
const SvgHelsekorsOutline = forwardRef(
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
          fill="#303030"
          d="M25.4 1V.8zm.6 15h-.2v.2h.2zm14.4 0v-.2zm.6.6h-.2zm0 8.8h.2zm-.6.6v.2zM26 26v-.2h-.2v.2zm0 14.4h.2zm-.6.6v.2zm-9.4-.6h-.2zM16 26h.2v-.2H16zM1.6 26v.2zm-.6-.6H.8zm0-8.8H.8zm.6-.6v.2zM16 16v.2h.2V16zm9.4-15v.2c.22 0 .4.18.4.4h.4a.8.8 0 0 0-.8-.8zm.6.6h-.2V16h.4V1.6zM26 16v.2h14.4v-.4H26zm14.4 0v.2c.22 0 .4.18.4.4h.4a.8.8 0 0 0-.8-.8zm.6.6h-.2v8.8h.4v-8.8zm0 8.8h-.2a.4.4 0 0 1-.4.4v.4a.8.8 0 0 0 .8-.8zm-.6.6v-.2H26v.4h14.4zM26 26h-.2v14.4h.4V26zm0 14.4h-.2a.4.4 0 0 1-.4.4v.4a.8.8 0 0 0 .8-.8zm-.6.6v-.2h-8.8v.4h8.8zm-8.8 0v-.2a.4.4 0 0 1-.4-.4h-.4c0 .443.36.8.8.8zm-.6-.6h.2V26h-.4v14.4zM16 26v-.2H1.6v.4H16zM1.6 26v-.2a.4.4 0 0 1-.4-.4H.8c0 .443.36.8.8.8zm-.6-.6h.2v-8.8H.8v8.8zm0-8.8h.2c0-.22.18-.4.4-.4v-.4c-.441 0-.8.359-.8.8zm.6-.6v.2H16v-.4H1.6zM16 16h.2V1.6h-.4V16zm0-14.4h.2c0-.22.18-.4.4-.4V.8c-.441 0-.8.359-.8.8zm.6-.6v.2h8.8V.8h-8.8z"
        />
      </svg>
    );
  },
);
export default SvgHelsekorsOutline;
