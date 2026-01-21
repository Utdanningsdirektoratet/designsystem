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
const SvgChipFill = forwardRef(
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
          strokeWidth={0.4}
          d="M9.596 1v4.245M9.596 36.755V41M5.245 9.596H1M41 9.596h-4.245M32.804 1v4.245M32.804 36.755V41M5.245 32.804H1M41 32.804h-4.245M21.2 1v4.245M21.2 36.755V41M5.245 21.2H1M41 21.2h-4.245M17.332 1v4.245M17.332 36.755V41M5.245 17.332H1M41 17.332h-4.245M28.936 1v4.245M28.936 36.755V41M5.245 28.936H1M41 28.936h-4.245M25.068 1v4.245M25.068 36.755V41M5.245 25.068H1M41 25.068h-4.245M13.464 1v4.245M13.464 36.755V41M5.245 13.464H1M41 13.464h-4.245"
        />
        <mask id="ChipFill_svg__a" fill="#fff">
          <path
            fillRule="evenodd"
            d="M7.59 5.245a2.345 2.345 0 0 0-2.345 2.344v26.822a2.345 2.345 0 0 0 2.344 2.344h26.822a2.345 2.345 0 0 0 2.344-2.344V7.589a2.345 2.345 0 0 0-2.344-2.344zm3.842 8.455a2.375 2.375 0 1 0 0-4.75 2.375 2.375 0 0 0 0 4.75"
            clipRule="evenodd"
          />
        </mask>
        <path
          fill="#A0A0A0"
          fillRule="evenodd"
          d="M7.59 5.245a2.345 2.345 0 0 0-2.345 2.344v26.822a2.345 2.345 0 0 0 2.344 2.344h26.822a2.345 2.345 0 0 0 2.344-2.344V7.589a2.345 2.345 0 0 0-2.344-2.344zm3.842 8.455a2.375 2.375 0 1 0 0-4.75 2.375 2.375 0 0 0 0 4.75"
          clipRule="evenodd"
        />
        <path
          fill="#303030"
          d="M5.645 7.59c0-1.075.87-1.945 1.944-1.945v-.8a2.745 2.745 0 0 0-2.744 2.744zm0 26.82V7.59h-.8v26.82zm1.944 1.945a1.945 1.945 0 0 1-1.944-1.944h-.8a2.745 2.745 0 0 0 2.744 2.744zm26.822 0H7.589v.8h26.822zm1.944-1.944c0 1.074-.87 1.944-1.944 1.944v.8a2.745 2.745 0 0 0 2.744-2.744zm0-26.822v26.822h.8V7.589zm-1.944-1.944c1.074 0 1.944.87 1.944 1.944h.8a2.745 2.745 0 0 0-2.744-2.744zm-26.822 0h26.822v-.8H7.589zm5.818 5.68c0 1.091-.884 1.975-1.975 1.975v.8a2.775 2.775 0 0 0 2.775-2.775zm-1.975-1.974c1.09 0 1.975.884 1.975 1.974h.8a2.775 2.775 0 0 0-2.775-2.774zm-1.975 1.974c0-1.09.885-1.974 1.975-1.974v-.8a2.775 2.775 0 0 0-2.775 2.774zm1.975 1.975a1.975 1.975 0 0 1-1.975-1.975h-.8a2.775 2.775 0 0 0 2.775 2.775z"
          mask="url(#ChipFill_svg__a)"
        />
      </svg>
    );
  },
);
export default SvgChipFill;
