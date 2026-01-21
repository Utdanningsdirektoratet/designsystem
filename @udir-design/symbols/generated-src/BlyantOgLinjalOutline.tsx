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
const SvgBlyantOgLinjalOutline = forwardRef(
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
    const __srcW = 36;
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
        viewBox="0 0 36 42"
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
          d="M19.885 3.487c.726.11 1.22.785 1.111 1.512l-4.975 33.154a1.34 1.34 0 0 1-1.514 1.129l-4.783-.68a1.34 1.34 0 0 1-1.139-1.516l4.72-33.214a1.34 1.34 0 0 1 1.52-1.138c1.4.206 3.595.531 5.06.753Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m11.144 31.007-1.66-.237M11.419 34.988l-2.486-.353M12.517 27.258l-2.486-.352M14.714 11.802l-2.486-.354M14.439 7.821l-1.66-.237M12.243 23.278l-1.661-.236M13.616 19.53l-2.486-.353M13.34 15.55l-1.66-.238"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m27.442 34.187-3.657-.016s-.013-.004-.013-.007l.054-29.048 3.839.017-.21 29.047s-.006.008-.013.007Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.2}
          d="m26.284 34.179-1.366-.007s-.005-.003-.004-.007l.103-29.047 1.434.006-.162 29.048s-.002.006-.005.007Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m23.777 34.183 1.813 5.161 1.861-5.143s-.004-.013-.013-.013l-3.65-.016q-.013.002-.013.012z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m24.828 37.137.762 2.207.782-2.202zM25.165 2.405l1.186.005a1.33 1.33 0 0 1 1.323 1.335l-.006 1.384q0 .001-.004.003l-3.831-.017-.003-.003.006-1.388c.004-.73.6-1.321 1.33-1.318z"
        />
      </svg>
    );
  },
);
export default SvgBlyantOgLinjalOutline;
