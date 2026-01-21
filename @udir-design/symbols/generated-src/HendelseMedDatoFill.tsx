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
const SvgHendelseMedDatoFill = forwardRef(
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
          fill="#E0EFFB"
          stroke="#303030"
          strokeWidth={0.4}
          d="M40.8 10.047V37.63a3.1 3.1 0 0 1-3.102 3.102H4.302A3.1 3.1 0 0 1 1.2 37.629V10.047z"
        />
        <path
          fill="#C8DEF0"
          stroke="#303030"
          strokeWidth={0.4}
          d="M4.302 3.294h33.396A3.1 3.1 0 0 1 40.8 6.396v3.69H1.2v-3.69a3.1 3.1 0 0 1 3.102-3.102Z"
        />
        <circle
          cx={9.733}
          cy={6.69}
          r={1.463}
          fill="#6D889D"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <circle
          cx={32.267}
          cy={6.69}
          r={1.463}
          fill="#6D889D"
          stroke="#303030"
          strokeWidth={0.4}
        />
        <rect
          width={1}
          height={5.477}
          x={9.232}
          y={1.2}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.213}
        />
        <rect
          width={1}
          height={5.477}
          x={31.767}
          y={1.2}
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          rx={0.213}
        />
        <path
          fill="#303030"
          d="M21.46 25.631q-.835-.005-1.631-.29a3.8 3.8 0 0 1-1.432-.937q-.636-.653-1.011-1.733-.375-1.085-.37-2.687 0-1.495.319-2.665.318-1.17.914-1.977a4.04 4.04 0 0 1 1.438-1.24q.846-.425 1.892-.425 1.097 0 1.943.432a3.66 3.66 0 0 1 1.375 1.181 3.74 3.74 0 0 1 .648 1.682H23.47a1.88 1.88 0 0 0-.653-1.068q-.489-.403-1.239-.403-1.21 0-1.864 1.05-.647 1.053-.653 2.887h.08q.278-.5.721-.858a3.3 3.3 0 0 1 1-.551q.562-.2 1.188-.199 1.022 0 1.835.489.818.489 1.295 1.346.477.853.472 1.955.006 1.148-.523 2.063a3.8 3.8 0 0 1-1.471 1.431q-.944.523-2.2.517m-.012-1.704q.62 0 1.108-.301.49-.302.773-.813.285-.51.278-1.148a2.26 2.26 0 0 0-.272-1.13 2.1 2.1 0 0 0-.756-.801 2.07 2.07 0 0 0-1.102-.296q-.46 0-.858.176a2.1 2.1 0 0 0-.693.489 2.3 2.3 0 0 0-.637 1.58q.006.607.284 1.119.28.51.767.818a2.04 2.04 0 0 0 1.108.307M14.008 31.968a1.32 1.32 0 0 0-.536-.966q-.475-.36-1.197-.359-.507 0-.895.174a1.47 1.47 0 0 0-.603.483 1.17 1.17 0 0 0-.217.696q0 .288.124.505.125.216.334.373.213.152.469.262.26.11.522.185l.767.22q.348.096.696.245.348.15.636.377.291.223.465.55.177.323.178.778 0 .582-.302 1.047-.302.466-.867.739-.564.27-1.353.27-.742 0-1.289-.245a2.1 2.1 0 0 1-.86-.686 1.93 1.93 0 0 1-.35-1.012h.681q.036.43.284.728.249.299.646.455.399.153.888.153.543 0 .966-.182.426-.184.668-.51.245-.331.245-.768a.98.98 0 0 0-.192-.618 1.5 1.5 0 0 0-.536-.422 5 5 0 0 0-.792-.302l-.87-.256q-.855-.255-1.328-.707-.473-.45-.473-1.15 0-.585.313-1.03a2.1 2.1 0 0 1 .852-.696q.54-.252 1.211-.252.678 0 1.2.248t.828.686q.309.433.33.987zm2.34 5.454V30.15h4.22v.596h-3.555v2.738h3.33v.597h-3.33v2.745h3.625v.596zm5.938 0V30.15h2.347q.774 0 1.293.298.522.295.785.803.266.508.266 1.143 0 .636-.263 1.147a1.95 1.95 0 0 1-.78.806q-.52.295-1.29.295h-1.847v-.597h1.83q.57 0 .947-.213.377-.216.561-.59.189-.371.189-.848 0-.476-.189-.849a1.35 1.35 0 0 0-.564-.586q-.377-.213-.955-.213H22.95v6.677zm5.81-6.676v-.596h5.273v.596h-2.305v6.677H30.4v-6.677z"
        />
      </svg>
    );
  },
);
export default SvgHendelseMedDatoFill;
