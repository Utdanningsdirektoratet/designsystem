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
const SvgBarnehageOutline = forwardRef(
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
    const __srcH = 22;
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
        viewBox="0 0 42 22"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M38.075 5.774H11.148v13.164h26.927z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M34.505 10.877h-4.952v8.061h4.952zM39.215 5.774H10.009L12.478 1h24.267zM7.084 19.05v-1.164m0-6.383h1.565v2.51m0 5.038v-1.165m-1.565 0h1.565m-1.565 0V16.62m1.565 1.266V16.62m-1.565 0h1.565m-1.565 0V15.31m1.565 1.311V15.31m-1.565 0h1.565m-1.565 0v-.542m1.565.542v-1.296m0 0H7.345"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M4.766 16.88C4.416 18.746.8 20.05 1.01 20.05h3.134c.15 0 2.35-.783 2.582-3.383a9.3 9.3 0 0 1 .616-2.658c.153-.39.309-.714.434-.992.218-.482.909-1.354.909-1.532h-1.55c-1.353 1.532-1.762 2.173-2.368 5.396ZM18.159 11.26a1.267 1.267 0 1 0 0-2.533 1.267 1.267 0 0 0 0 2.534ZM21.4 9.772a1.045 1.045 0 1 0 0-2.09 1.045 1.045 0 0 0 0 2.09ZM21.341 13.99h-7.137v2.741h7.137zM26.622 12.567H22.73v4.176h3.89z"
        />
      </svg>
    );
  },
);
export default SvgBarnehageOutline;
