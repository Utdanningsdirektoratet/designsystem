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
const SvgFargeskalaOutline = forwardRef(
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
    const __srcW = 45;
    const __srcH = 53;
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
        viewBox="0 0 45 53"
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
          d="m21.165 7.803-1.906-.463-8.123 36.729 10.54 2.331 1.016-4.591.507-2.296.148-.65"
        />
        <path
          stroke="#303030"
          strokeWidth={0.3}
          d="m13.624 38.37 8.198 1.814-1.036 4.683-8.198-1.813zM21.723 27.484l-.265-.059-1.061-.234-4.246-.94-1.1 4.977 4.245.939 2.123.47 1.061.234M22.659 33.947l-.398-.082-1.062-.235-2.123-.47-4.245-.938-1.1 4.976 8.49 1.878.55-2.488.138-.622M20.656 20.986l-1.062-.235-2.122-.47-1.101 4.976 4.246.94.921.205M19.73 14.53l-.938-.219-1.1 4.976 2.122.47.53.117"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M18.671 8.177 28.947 6.61 34.56 43.4 24.282 44.97z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.3}
          d="m24.38 38.984 8.3-1.266.723 4.741-8.3 1.266zM22.537 26.895l8.3-1.266.723 4.741-8.3 1.266zM23.459 32.939l8.3-1.266.723 4.741-8.3 1.266zM21.615 20.85l8.3-1.266.723 4.741-8.3 1.266zM20.693 14.806l8.3-1.266.723 4.741-8.3 1.266z"
        />
        <circle
          cx={20.471}
          cy={9.472}
          r={0.686}
          fill="#303030"
          transform="rotate(.38 20.471 9.472)"
        />
      </svg>
    );
  },
);
export default SvgFargeskalaOutline;
