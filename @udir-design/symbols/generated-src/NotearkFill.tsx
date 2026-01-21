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
const SvgNotearkFill = forwardRef(
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
    const __srcW = 41;
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
        viewBox="0 0 41 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#FBFBFB"
          stroke="#303030"
          strokeWidth={0.4}
          d="M37.274 30.53C36.58 28.635 29.417 5.62 29 4.142c-.385-1.37-.492-2.064-.506-2.16l-.001-.004q-.003 0-.003-.003l-.005-.001h-.004l-3.432.868h-.007q-.004-.002-.004-.004l-.002-.003-.494-1.827q0-.003-.002-.004l-.003-.003L24.534 1h-.004L1.008 6.447l-.003.003q-.003 0-.003.003-.001 0-.002.004v.003l10.162 33.116.001.004.003.003q.004 0 .004.002.004 0 .004-.002l3.525-.958h.009l.005.007.841 2.36q.002.005.007.007.003.002.007 0l23.815-7.092q.002 0 .004-.002t.003-.005v-.005q0-.003-.003-.005c-.138-.145-1.457-1.567-2.113-3.36Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="M10.193 14.56s5.914-1.546 10.19-2.449c4.276-.9 7.233-2.102 7.233-2.102M10.84 16.455s7.37-1.755 10.235-2.54c2.866-.787 7.21-2.126 7.21-2.126M11.256 18.304s5.638-1.41 9.312-2.31 8.18-2.473 8.18-2.473M11.766 19.968s6.723-1.618 9.89-2.541c3.167-.924 7.626-2.356 7.626-2.356M13.52 25.606s5.245-1.132 9.174-2.22c3.928-1.087 8.364-2.586 8.364-2.586M14.122 27.363s5.244-1.132 9.173-2.219c3.927-1.088 8.363-2.587 8.363-2.587M14.722 29.05s5.245-1.132 9.173-2.22c3.93-1.088 8.364-2.587 8.364-2.587M15.3 30.667s8.18-2.01 10.307-2.657c2.125-.648 7.162-2.288 7.162-2.288"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="M13.775 20.559s.67.347 1.108-.312c.439-.66.058-1.42-.267-2.103-.324-.682-3.246-5.234-3.547-5.787-.3-.555-.243-.949.195-1.053.44-.104.959.52.959 1.283a9.5 9.5 0 0 1-.38 2.508c-.232.776-.371 2.31.22 3.062a1.78 1.78 0 0 0 2.379.403c.773-.497.692-2.125.15-2.635-.543-.507-1.469-.3-1.629.347a.61.61 0 0 0 .538.79.6.6 0 0 0 .352-.084M20.555 20.007l-.229-.989-.744-3.22M26.664 17.497l-.203-.89-.773-3.392"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="m26.687 17.602-6.1 2.547-.26-1.13 6.134-2.411z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m18.196 25.755 1.19 5.2M25.04 2.845 5.248 8.022s5.222 17.976 5.869 20.104 3.593 10.496 3.593 10.496"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="m14.15 20.665.004-.003.004-.006-.001-.005-.003-.005c-.028-.021-.077-.088-.099-.302-.036-.312-.503-.468-.624-.173-.12.29-.002.735.72.494ZM25.576 13.381c-.186-.36-.142-1.001.627-1.287.767-.285.984.473.867.869-.117.394-1.128 1.124-1.494.418ZM19.433 15.834c-.186-.359-.142-1 .627-1.286.767-.286.983.472.866.869-.119.396-1.128 1.126-1.493.417ZM18.3 26.034s.646.208 1.212-.497.3-1.572-.474-1.479c-.773.092-1.027.832-1.063 1.294-.033.462.21.636.325.682Z"
        />
      </svg>
    );
  },
);
export default SvgNotearkFill;
