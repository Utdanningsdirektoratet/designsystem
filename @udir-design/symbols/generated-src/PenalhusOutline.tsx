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
const SvgPenalhusOutline = forwardRef(
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
    const __srcH = 36;
    const __isWide = true;
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
        viewBox="0 0 42 36"
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
          d="M11.424 34.734c-4.614.925-2.5-10.736-2.188-12.506.791-4.493 26.967-13.791 29.603-13.923 2.636-.133 2.12 3.452 2.12 6.67 0 5.926-2.12 6.977-5.18 8.925-2.36 1.502-13.365 8.63-24.356 10.834Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M24.378 5.716c.793-.176 1.64-.334 2.484-.46m-3.354.667-1.552.456c-6.31 2.172-16.397 7.636-18.252 9.078-2.045 1.592-2.686 4.837-2.686 7.84 0 1.704-.291 5.291 1.497 6.86 1.787 1.567 7.565 4.681 7.83 4.548-2.648-1.22-1.987-8.248-1.065-12.609.823-3.887 28.516-14.83 30.335-13.712.849.521-1.858-1.1-4.505-2.277"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M12.511 14.292c-2.496 1.425-6.548 4.165-6.914 5.022-.531 1.243-.72 4.53-.929 4.233-.184-.261.494-3.685.702-4.128.593-1.259 5.524-4.469 7.424-5.454m4.39-2.777c-.642.441-2.527 1.645-3.722 2.38"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M11.691 16.086c.06-.482 1.308-2.724 1.614-2.56s-.587 2.587-.922 2.946c-.179.192-.763.184-.692-.386Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M34.036 4.492c-.331-.407-1.427-1.763-2.062-2.549a.727.727 0 0 0-1.034-.099l-5.685 4.76"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m28.399 5.972-.964-1.14M29.846 4.092l-.644-.762M22.73 10.152l-.277-.37M24.866 8.976l-.736-.88M26.313 7.096l-.644-.761"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M31.158 8.222c-1.68.542-3.22 1.006-4.79 1.334l8.275-5.572 1.1 1.665-2.69 1.82s-.546.39-1.895.753Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m30.31 8.44-2.348.7s2.331-1.537 7.024-4.64l.411.621C31.255 7.981 30.31 8.44 30.31 8.44Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m36.2 3.778.34.514a.693.693 0 0 1-.194.96l-.6.397h-.002l-1.099-1.663v-.002l.601-.4a.687.687 0 0 1 .953.194ZM21.717 10.796l-2.068.66-1.741.548s2.05-2.316 5.143-5.57l1.47 1.349c-1.819 1.937-2.804 3.013-2.804 3.013Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M20.562 11.11c-.15.046-1.274.422-1.274.422l4.22-4.681.55.504c-.885.972-3.496 3.755-3.496 3.755Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m24.511 5.857.455.416c.28.257.3.695.043.977l-.485.532h-.003l-1.467-1.346v-.003l.486-.533c.256-.28.691-.3.971-.043Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m17.926 11.995 2.294-2.523c-2.011.912-5.326 3.192-6.933 4.306l2.102-.851zM21.74 10.787c1.63-.448 4.511-1.226 4.998-1.315"
        />
      </svg>
    );
  },
);
export default SvgPenalhusOutline;
