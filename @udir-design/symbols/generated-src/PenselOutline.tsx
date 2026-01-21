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
const SvgPenselOutline = forwardRef(
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
          d="M28.053 15.939 4.508 39.35a2 2 0 0 1-.191.169 2.3 2.3 0 0 1-.536.323c-.217.09-.457.142-.705.11-.245-.031-.512-.147-.783-.419-.272-.272-.386-.539-.417-.783a1.37 1.37 0 0 1 .115-.704 2.3 2.3 0 0 1 .498-.727l23.544-23.412zM33.864 10.775l-5.78 5.165-2.057-2.068 5.202-5.746zM38.391 3.374c.664 3.178-.43 5.297-1.79 6.156a14 14 0 0 1-2.56 1.263l-.112.04-2.763-2.78.003-.01a10.064 10.064 0 0 1 .509-1.39c.373-.824.932-1.722 1.686-2.159.795-.46 1.657-.522 2.567-.588.813-.06 1.665-.123 2.46-.532Z"
        />
      </svg>
    );
  },
);
export default SvgPenselOutline;
