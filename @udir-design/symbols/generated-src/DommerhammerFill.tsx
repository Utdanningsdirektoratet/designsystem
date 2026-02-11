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
const SvgDommerhammerFill = forwardRef(
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
          fill="#937A57"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M39.915 38.805V37.12a.684.684 0 0 0-.684-.684H19.967a.684.684 0 0 0-.684.684v1.685c0 .378.306.684.683.684h19.265a.684.684 0 0 0 .684-.684Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M39.065 35.752v-.16a.684.684 0 0 0-.684-.683H20.816a.684.684 0 0 0-.684.684v.16c0 .377.306.683.684.683h17.565a.684.684 0 0 0 .684-.684Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m16.865 9.962 2.573 1.376L4.027 40.152a.96.96 0 0 1-1.302.395l-.877-.47a.96.96 0 0 1-.394-1.301zM27.596 8.799 14.443 1.764a.96.96 0 0 0-1.301.394l-1.963 3.67a.96.96 0 0 0 .394 1.302l13.153 7.035a.96.96 0 0 0 1.302-.395l1.963-3.67a.96.96 0 0 0-.395-1.301Z"
        />
        <path
          fill="#5BA27E"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m27.574 7.921-.49-.262a.684.684 0 0 0-.926.28l-2.946 5.509a.684.684 0 0 0 .28.925l.49.263a.684.684 0 0 0 .926-.281l2.946-5.508a.684.684 0 0 0-.28-.926ZM24.293 6.995a.65.65 0 0 0-1.148-.614l-2.901 5.425a.65.65 0 1 0 1.147.614zM18.93 4.125a.65.65 0 0 0-1.147-.613l-2.901 5.424a.65.65 0 0 0 1.147.614zM15.73 1.585l-.49-.262a.684.684 0 0 0-.926.28l-2.946 5.508a.684.684 0 0 0 .28.926l.49.262a.684.684 0 0 0 .926-.28L16.01 2.51a.684.684 0 0 0-.28-.925Z"
        />
      </svg>
    );
  },
);
export default SvgDommerhammerFill;
