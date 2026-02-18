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
const SvgMenneske8Fill = forwardRef(
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
          fill="#937A57"
          stroke="#303030"
          strokeWidth={0.395}
          d="M14.177 18.955c-1.617.015-3.531-2.483-3.014-3.015.27-.278.59-2.518.59-2.954 0-.593 4.587-.43 4.638 0 .093.786.407 2.717.53 3.05.172.473-1.17 2.904-2.744 2.919Z"
        />
        <path
          fill="#937A57"
          stroke="#303030"
          strokeWidth={0.395}
          d="M11.22 12.79C9.95 10.88 9.365 6.46 9.365 5.438c-.057-1.285 2.215-3.337 4.729-3.337 2.297 0 4.6 1.857 4.6 3.337 0 1.016-.451 5.529-1.663 7.35-.873 1.311-4.978 1.249-5.81 0Z"
        />
        <path
          fill="#261F14"
          stroke="#303030"
          strokeWidth={0.395}
          d="M6.613 8.705c-.43.507 1.994 3.416 2.936 3.054 1.254-.773.396-6.287 2.305-6.525 1.493-.185 3.558-1.486 3.773-3.392-5.503-2.091-4.259.371-6.249.371-.786 0-1.93 5.506-2.765 6.491Z"
        />
        <path
          fill="#261F14"
          stroke="#303030"
          strokeWidth={0.395}
          d="M18.856 2.421c.884.709 2.7 6.387 2.988 6.72.428.495-3.188 3.35-3.52 2.665-.529-1.092.24-6.884-3.597-7.723-1.043-.228.93-1.787.93-2.237 0-.658 2.535.045 3.198.575Z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.395}
          d="M18.952 15.598V29.31H9.004V15.598l1.745-.087q.05.078.137.197c.133.176.333.41.605.641.545.465 1.38.924 2.53.893a4.08 4.08 0 0 0 2.52-.935c.27-.223.471-.445.604-.612.058-.072.1-.136.134-.184z"
        />
        <path
          fill="#C8DEF0"
          stroke="#303030"
          strokeWidth={0.395}
          d="M24.263 16.95c-.95-.317-3.956-1.143-5.504-1.673 0 0-2.163 6.561-4.732 6.542-2.548-.018-4.822-6.542-4.822-6.542-2.489.751-4.889 1.23-5.812 1.673-1.35.648-2.916 14.833-2.224 15.454s4.984.52 4.984 1.234l-1.001 6.965 6.776.397h3.012l6.588-.398-1.06-8.198 1.277-9.143 1.974 13.677c3.512-.647 3.719.237 3.487-4.384-.088-1.76-2.52-15.462-2.943-15.604Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.395}
          d="m29.39 22.28-6.978 2.439-9.069-.336-2.328 12.027 9.036.325 6.717-2.63z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.395}
          d="m24.22 26.565 3.03-1.094M23.97 27.905l3.058-1.149M23.887 29.191l2.89-1.067"
        />
        <path
          fill="#937A57"
          stroke="#303030"
          strokeWidth={0.395}
          d="M24.02 36.648c-1.613-1.3-3.988-2.805-3.547-4.156.75-2.3 2.58-.465 3.38.348-.254-.473-.212-.918.023-1.242s1.295 1.833 1.986 2.479c.44.41-1.12 3.155-1.842 2.571Z"
        />
        <path
          fill="#C8DEF0"
          stroke="#303030"
          strokeWidth={0.395}
          d="M22.72 36.516c.111.406 1.477 1.025 1.729 1.044 2.314.18 3.158-2.32 2.677-3.265l-1.335-.485z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m6.24 23.243-.348 5.005 6.434 1.326M6.094 33.485l5.406.538"
        />
      </svg>
    );
  },
);
export default SvgMenneske8Fill;
