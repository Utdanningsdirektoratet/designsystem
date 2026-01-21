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
const SvgMenneske5Bl = forwardRef(
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
    const __srcW = 22;
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
        viewBox="0 0 22 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M11.572 1.11c1.265-.334 1.958.108 2.633 1.08.505.728.578 2.283.89 2.927.418.861-.6 2.165-.948 2.984-.35.82-1.737 1.235-1.737 1.235-.271.406-.34 1.324-.191 1.577.122.205 1.96.51 2.647.886 1.388.758 3.132 3.874 3.777 5.47.763 1.883 2.073 5.116 1.36 5.223a8 8 0 0 0-.558.135s.65 1.888.005 2.286c-.427.264-.514-.952-.905-1.055-.447-.119-.388.29-.704.147-.316-.142-.349-1.042-.349-1.042s-1.076-.332-1.047 0c.508 5.884-.445 13.284-.782 14.007-.153.33-.974 1.132-.648 1.232 2.16.661 2.03 2.22 1.652 2.555-.459.406-1.483.192-2.318.142-.875-.052-1.093-.577-2.248-.975-.201-.069-.14-1.155-.08-1.39.139-.531-.506-.758-.56-.91l-.672-9.842a.18.18 0 0 0-.185-.167.18.18 0 0 0-.184.167l-.672 9.843c-.053.152-.698.379-.561.91.06.234.122 1.32-.08 1.39-1.156.397-1.373.922-2.247.974-.835.05-1.86.264-2.319-.142-.378-.335-.508-1.894 1.653-2.555.325-.1-.495-.903-.649-1.232-.336-.723-1.288-8.123-.781-14.007.029-.332-1.048 0-1.048 0s-.032.9-.349 1.042c-.315.142-.256-.266-.703-.147-.392.104-.479 1.32-.905 1.055-.645-.398.005-2.286.005-2.286s-.404-.112-.558-.135c-.714-.107.597-3.34 1.36-5.224.646-1.595 2.389-4.71 3.777-5.469.687-.376 2.525-.68 2.647-.886.15-.253.08-1.17-.191-1.577 0 0-1.397-.44-1.737-1.235-.35-.818-1.41-2.05-.998-2.913.368-.773-.108-1.35.398-2.078.674-.972 1.582-1.978 2.86-1.686.986.227 1.643-.15 2.254-.312z"
        />
      </svg>
    );
  },
);
export default SvgMenneske5Bl;
