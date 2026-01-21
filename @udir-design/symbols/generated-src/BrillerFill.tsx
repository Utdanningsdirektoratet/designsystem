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
const SvgBrillerFill = forwardRef(
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
          fill="#D3E6F6"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M23.429 23.348c2.433-1.405 3.106-4.795 1.502-7.572s-4.876-3.89-7.31-2.485-3.105 4.795-1.502 7.572c1.604 2.778 4.876 3.89 7.31 2.485Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M16.283 14.473c-.366-.704-1.668-1.757-2.805-1.302"
        />
        <path
          fill="#D3E6F6"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M11.213 18.686c2.433-1.405 3.106-4.796 1.503-7.573-1.604-2.778-4.876-3.89-7.31-2.485S2.3 13.423 3.903 16.2c1.604 2.777 4.877 3.89 7.31 2.485Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M21.714 4.631c-1.89-6.543-7.341-2.246-7.341-2.246l-7.97 5.812M41 11.16c-.432-4.962-3.867-2.192-3.867-2.192l-11.43 8.712M7.847 17.634c.711.35 2.384.427 3.032-.61M19.809 22.247c.711.35 2.384.427 3.032-.61"
        />
      </svg>
    );
  },
);
export default SvgBrillerFill;
