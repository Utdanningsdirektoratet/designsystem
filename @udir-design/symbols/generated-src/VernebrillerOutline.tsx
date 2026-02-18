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
const SvgVernebrillerOutline = forwardRef(
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
    const __srcH = 27;
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
        viewBox="0 0 42 27"
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
          d="M40.483 9.07a1.59 1.59 0 0 0-1.768-1.388L2.4 12.036a1.59 1.59 0 0 0-1.39 1.768s1.004 5.985 1.1 6.62c.412 3.093 4.66 5.125 9.525 4.542 4.127-.495 7.376-2.713 8.065-5.268.12-.443.164-3.452.62-3.507l1.97-.236c.451-.054 1.204 2.858 1.424 3.257 1.27 2.324 4.954 3.712 9.083 3.218 4.865-.583 8.512-3.561 8.181-6.666-.055-.773-.495-6.692-.495-6.692z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M3.207 11.94s5.257-6.516 7.456-8.28c1.719-1.378 4.041-1.571 4.1.725.071 2.807-1.64 2.756-1.436 1.504.217-1.336-.306-2.14-2.277-.229S7.38 11.44 7.38 11.44l-4.172.5zM38.051 7.761S31.402 2.674 28.85 1.48c-1.996-.933-4.298-.572-3.812 1.673.595 2.745 2.245 2.29 1.752 1.123-.527-1.248-.208-2.152 2.159-.762 2.367 1.392 4.93 4.747 4.93 4.747l4.172-.5z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M2.33 12.043 38.79 7.67l.134 1.118a.17.17 0 0 1-.151.183L2.655 13.303a.17.17 0 0 1-.19-.142l-.135-1.117z"
        />
      </svg>
    );
  },
);
export default SvgVernebrillerOutline;
