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
const SvgPenalhusFill = forwardRef(
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
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M11.424 34.733c-4.614.923-2.5-10.708-2.188-12.473.791-4.482 26.967-13.756 29.603-13.888s2.12 3.444 2.12 6.654c0 5.91-2.12 6.959-5.18 8.901-2.36 1.498-13.365 8.608-24.356 10.806Z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeWidth={0.4}
          d="M2.515 30.167c-1.788-1.564-1.497-5.142-1.497-6.842 0-2.995.64-6.231 2.686-7.818 1.855-1.439 11.943-6.889 18.252-9.055 2.687-.922 7.769-1.73 10.1-1.327 2.183.376 6.358 2.678 7.451 3.282a.4.4 0 0 1 .108.045c.258.157.188.118-.108-.045-2.601-.719-29.418 9.907-30.227 13.721-.922 4.35-1.583 11.36 1.064 12.576-.264.133-6.042-2.972-7.83-4.537Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M23.747 10.3c3.989-1.079 7.602-2.092 9.204-2.792.553-.242-.51-1.074-1.602-1.006-2.698.169-6.285.778-8.714 1.87-2.253 1.011-4.422 2.17-5.451 2.876-.882.605-4.112 2.646-4.673 2.936-1.9.982-6.548 4.019-7.14 5.274-.21.442-.887 3.857-.703 4.118.209.295.398-2.983.93-4.223.365-.854 4.417-3.588 6.913-5.009 2.157-1.228 6.053-2.642 11.236-4.044Z"
        />
        <path
          fill="#A9C0D3"
          stroke="#303030"
          strokeWidth={0.4}
          d="M11.691 16.134c.06-.481 1.308-2.717 1.614-2.554s-.587 2.58-.922 2.938c-.179.192-.763.184-.692-.384Z"
        />
        <path
          fill="#A9C0D3"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M33.934 4.349a.722.722 0 0 1-.186 1.083l-6.62 3.962a.7.7 0 0 1-.188.079l-7.3 1.935 11.31-9.486a.73.73 0 0 1 1.027.09c.525.625 1.378 1.643 1.957 2.337Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m28.399 6.045-.964-1.136M29.846 4.17l-.644-.76M22.78 10.164l-.645-.76M24.866 9.042l-.964-1.136M26.313 7.167l-.644-.76"
        />
        <path
          fill="#5BA27E"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M31.158 8.29c-1.68.54-3.22 1.003-4.79 1.331l8.275-5.559 1.1 1.662-2.69 1.815s-.546.389-1.895.751Z"
        />
        <path
          fill="#9BD8B9"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m30.31 8.507-2.348.7s2.331-1.535 7.024-4.63l.411.62c-4.142 2.853-5.087 3.31-5.087 3.31Z"
        />
        <path
          fill="#DDF1E7"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m36.2 3.857.34.514a.69.69 0 0 1-.194.956l-.6.397h-.002l-1.099-1.66v-.001l.601-.398a.69.69 0 0 1 .953.192Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m21.717 10.857-2.068.658-1.741.547s2.05-2.31 5.143-5.556l1.47 1.346a365 365 0 0 0-2.804 3.005Z"
        />
        <path
          fill="#A9DBC2"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="M20.562 11.17c-.15.046-1.274.421-1.274.421l4.22-4.669.55.503c-.885.97-3.496 3.746-3.496 3.746Z"
        />
        <path
          fill="#DDF1E7"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m24.511 5.931.455.415c.28.257.3.694.043.975l-.485.53h-.003l-1.467-1.343v-.002l.486-.532c.256-.28.691-.299.971-.043Z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeWidth={0.4}
          d="m17.926 12.053 2.294-2.516c-2.011.91-5.326 3.183-6.933 4.295l2.102-.85z"
        />
      </svg>
    );
  },
);
export default SvgPenalhusFill;
