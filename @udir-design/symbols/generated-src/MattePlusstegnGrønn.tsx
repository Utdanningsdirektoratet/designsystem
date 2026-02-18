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
const SvgMattePlusstegnGrnn = forwardRef(
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
        <mask id="MattePlusstegnGr\xF8nn_svg__a" fill="#fff">
          <path d="M25 17h16v8H25v16h-8V25H1v-8h16V1h8z" />
        </mask>
        <path fill="#76C69D" d="M25 17h16v8H25v16h-8V25H1v-8h16V1h8z" />
        <path
          fill="#303030"
          d="M25 17h-.4v.4h.4zm16 0h.4v-.4H41zm0 8v.4h.4V25zm-16 0v-.4h-.4v.4zm0 16v.4h.4V41zm-8 0h-.4v.4h.4zm0-16h.4v-.4H17zM1 25H.6v.4H1zm0-8v-.4H.6v.4zm16 0v.4h.4V17zm0-16V.6h-.4V1zm8 0h.4V.6H25zm0 16v.4h16v-.8H25zm16 0h-.4v8h.8v-8zm0 8v-.4H25v.8h16zm-16 0h-.4v16h.8V25zm0 16v-.4h-8v.8h8zm-8 0h.4V25h-.8v16zm0-16v-.4H1v.8h16zM1 25h.4v-8H.6v8zm0-8v.4h16v-.8H1zm16 0h.4V1h-.8v16zm0-16v.4h8V.6h-8zm8 0h-.4v16h.8V1z"
          mask="url(#MattePlusstegnGr\xF8nn_svg__a)"
        />
      </svg>
    );
  },
);
export default SvgMattePlusstegnGrnn;
