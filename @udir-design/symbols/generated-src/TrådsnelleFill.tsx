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
const SvgTrdsnelleFill = forwardRef(
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
    const __srcH = 38;
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
        viewBox="0 0 42 38"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M28.27 20.04c.181.54-2.034 1.818-4.95 2.856s-5.427 1.44-5.608.9l-.393-1.172 10.558-3.756z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M27.813 18.68c.198.588-2.005 1.906-4.92 2.943-2.917 1.038-5.44 1.401-5.638.813l.352-1.879 8.803-3.132zM12.403 7.434l1.284 1.65 8.83-3.143.022-2.113z"
        />
        <path
          fill="#6D889D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M26.415 17.439s-1.653 1.218-4.213 2.129c-2.56.91-4.59 1.003-4.59 1.003L13.548 8.476s2.356-.203 4.583-1.028c2.275-.842 4.22-2.105 4.22-2.105z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M24.6 12.038c.182.54-1.642 1.68-4.073 2.544-2.43.865-4.548 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M24.396 11.427c.181.54-1.643 1.68-4.074 2.544s-4.548 1.129-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M24.198 10.839c.181.54-1.642 1.68-4.073 2.544s-4.549 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.987 10.21c.181.54-1.643 1.679-4.073 2.544s-4.55 1.128-4.73.587"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.782 9.599c.181.54-1.643 1.68-4.074 2.544s-4.548 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.584 9.01c.181.54-1.642 1.68-4.073 2.545s-4.549 1.128-4.73.588M25.204 13.833c.181.54-1.643 1.68-4.073 2.545s-4.55 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M24.999 13.223c.181.54-1.642 1.68-4.073 2.544s-4.55 1.128-4.73.588M25.603 15.022c.181.54-1.642 1.68-4.073 2.545-2.431.864-4.549 1.128-4.73.587"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M25.793 15.583c.181.54-1.642 1.679-4.073 2.544s-4.549 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M25.971 16.113c.181.54-1.642 1.68-4.073 2.544s-4.549 1.128-4.73.588M25.398 14.412c.181.54-1.642 1.68-4.073 2.544s-4.549 1.128-4.73.588M24.801 12.635c.182.54-1.642 1.679-4.073 2.544s-4.549 1.128-4.73.588M23.377 8.395c.182.54-1.642 1.679-4.073 2.544s-4.549 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.172 7.784c.182.54-1.642 1.68-4.073 2.545-2.431.864-4.549 1.128-4.73.587"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.975 7.196c.181.54-1.643 1.68-4.074 2.544s-4.548 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.792 6.648c.182.54-1.642 1.68-4.073 2.544-2.43.865-4.549 1.128-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.593 6.06c.182.54-1.642 1.68-4.073 2.544-2.43.865-4.549 1.129-4.73.588"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.429 5.57c.181.541-1.642 1.68-4.073 2.545s-4.549 1.129-4.73.588"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M22.69 3.425c.182.54-2.034 1.82-4.95 2.857s-5.426 1.44-5.607.9l-.394-1.172 10.558-3.756z"
        />
        <path
          fill="#F2E8DA"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M17.313 5.01c2.915-1.038 5.119-2.356 4.92-2.944-.197-.589-2.72-.225-5.636.812s-5.119 2.356-4.921 2.944 2.721.225 5.637-.813Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M17.093 4.354c1.122-.4 1.97-.907 1.894-1.133-.076-.227-1.048-.087-2.17.312-1.122.4-1.97.907-1.894 1.134s1.047.086 2.17-.313Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M36.31 2.628s-1.59 3.908-6.011 3.908c-3.962-.155-6.96 1.41-6.96 1.41M16.696 17.606s-2.97 1.154-7.423-1.137C5.26 14.402-.746 19.906 1.481 29.073c1.809 7.447 11.466 8.02 17.811 6.302C29.868 32.51 33.764 19.906 41 25.062"
        />
      </svg>
    );
  },
);
export default SvgTrdsnelleFill;
