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
const SvgHammerOgLinjalFill = forwardRef(
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
    const __srcW = 33;
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
        viewBox="0 0 33 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g
          stroke="#303030"
          strokeMiterlimit={10}
          clipPath="url(#HammerOgLinjalFill_svg__a)"
        >
          <path
            fill="#BFA687"
            strokeWidth={0.4}
            d="m7.7 33.056-3.746-.541a.364.364 0 0 0-.413.309l-.176 1.225c-.03.2.109.384.308.413l3.747.54c.199.029.384-.11.412-.308l.177-1.226a.364.364 0 0 0-.308-.413Z"
          />
          <path
            fill="#E5CEAE"
            strokeWidth={0.4}
            d="m7.612 33.043-3.569-.515L7.945 7.423l3.02.436z"
          />
          <path
            fill="#7F99AE"
            strokeWidth={0.4}
            d="m17.559 1.963-2.182-.315a.343.343 0 0 0-.388.29l-.615 4.258a.343.343 0 0 0 .291.388l2.182.315a.343.343 0 0 0 .388-.29l.614-4.258a.343.343 0 0 0-.29-.388ZM3.862 2.218C1.998 3.951 1.294 5.028 1.05 5.802c-.244.774.421.924 1.402.202 1.19-.875 3.834-2.914 5.121-1.183.578.778.37 2.602.37 2.602l3.021.436s.494-2.517 1.353-2.5c1.161.023.777.689 1.213.8.187.048.833.11.833.11l.632-4.382-.825-.13c-.586-.06-.39.685-1.363.52-.807-.136-.438-.78-1.015-.863-1.852-.267-5.88-1.105-7.931.804Z"
          />
          <path
            fill="#BED5E8"
            strokeWidth={0.4}
            d="m24.1 32.255-5.114-22.87 5.968-1.335L31.4 36.877s-.003.008-.007.005z"
          />
          <path
            fill="#76C69D"
            strokeWidth={0.4}
            d="M11.677 35.033 24.1 32.255l7.279 4.618c.01.006.006.02-.004.022L13.012 41z"
          />
          <path
            strokeWidth={0.3}
            d="m24.992 14.49 1.336-.298M23.636 11.533l1.997-.446M25.024 17.744l1.998-.448M27.801 30.163l1.998-.446M13.583 39.353l13.813-3.089M29.158 33.12l1.335-.298M26.38 20.7l1.336-.298M26.413 23.954l1.997-.447M27.769 26.91l1.336-.297"
          />
        </g>
        <defs>
          <clipPath id="HammerOgLinjalFill_svg__a">
            <path fill="#fff" d="M0 0h32.399v41.999H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgHammerOgLinjalFill;
