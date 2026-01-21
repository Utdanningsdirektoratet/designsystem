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
const SvgMenneske8Outline = forwardRef(
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
    const __srcW = 31;
    const __srcH = 42;
    const __isWide = false;
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
        viewBox="0 0 31 42"
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
          strokeWidth={0.395}
          d="M11.425 15.685c.266-.279.605-2.037.605-2.472m5.001 2.594c-.12-.334-.34-1.808-.432-2.594"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M10.49 10.302c.26.897.63 1.896 1.017 2.487.817 1.249 4.858 1.311 5.717 0 .431-.659.765-1.67 1.015-2.74"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M15.843 1.842c-5.416-2.091-4.191.371-6.15.371-.774 0-1.9 5.506-2.721 6.491-.423.508 1.962 3.417 2.89 3.055 1.234-.773.39-6.287 2.268-6.525.833-.105 1.848-.569 2.61-1.299"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M19.02 2.422c.871.708 2.659 6.386 2.942 6.719.421.495-3.138 3.35-3.464 2.665-.52-1.092.237-6.884-3.54-7.723-1.027-.228.915-1.787.915-2.237 0-.658 2.495.045 3.148.576ZM9.5 15.398l1.648-.089s.964 1.795 3.11 1.735 3.11-1.735 3.11-1.735l1.558.075"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M27.184 32.404s.102 1.632.102 2.526M25.81 23.57c-.63-3.442-1.27-6.553-1.467-6.62-.936-.317-3.894-1.143-5.417-1.673 0 0-2.13 6.561-4.657 6.542-2.509-.018-4.746-6.542-4.746-6.542-2.45.751-4.812 1.23-5.72 1.673C3.438 17.128 1 27.871 1 31.951c0 .692 4.918.947 5.647 1.54l-1.113 7.111 6.669.398h2.964l6.484-.398-.55-4.266m.986-11.604-.222-1.471-.188 1.47"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="m26.808 34.104 2.58-11.824-6.867 2.439-8.926-.336-2.291 12.027 8.893.325 1.653-.658.826-.329M24.3 26.565l2.982-1.094M24.054 27.905l3.01-1.149M23.972 29.191l2.845-1.067"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M25.748 33.907c-.681-.645-1.555-2.632-1.786-2.308-.231.323-.273.768-.022 1.24-.788-.812-2.59-2.648-3.328-.347-.33 1.027 1.279 2.581 2.605 3.629"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="M22.825 36.516c.108.406 1.453 1.025 1.7 1.044 2.278.18 3.108-2.32 2.635-3.265l-1.314-.485z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m6.677 23.268-.342 5.005 6.331 1.326M6.533 33.51l5.32.538"
        />
      </svg>
    );
  },
);
export default SvgMenneske8Outline;
