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
const SvgHammerOgLinjalOutline = forwardRef(
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
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m7.7 33.056-3.746-.54a.364.364 0 0 0-.413.308l-.176 1.225c-.03.2.109.384.308.413l3.747.54c.199.03.384-.11.412-.308l.177-1.226a.364.364 0 0 0-.309-.412ZM7.612 33.043l-3.569-.515L7.945 7.423l3.02.437zM17.559 1.963l-2.182-.314a.343.343 0 0 0-.388.29l-.615 4.257a.343.343 0 0 0 .291.389l2.181.314a.343.343 0 0 0 .39-.29l.613-4.257a.343.343 0 0 0-.29-.389Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M3.862 2.218C1.998 3.952 1.294 5.028 1.05 5.803s.422.923 1.403.202c1.19-.876 3.834-2.915 5.12-1.184.58.779.372 2.602.372 2.602l3.02.436s.494-2.517 1.353-2.5c1.161.024.777.689 1.213.8.187.049.833.11.833.11l.632-4.382-.825-.129c-.587-.06-.39.685-1.363.52-.808-.136-.439-.78-1.015-.863-1.852-.268-5.88-1.106-7.931.802zM24.1 32.255l-5.114-22.87 5.968-1.334 6.445 28.826s-.004.008-.008.005z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M11.677 35.033 24.1 32.255l7.279 4.618c.009.006.006.02-.004.022L13.01 41z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="m24.992 14.49 1.336-.298M23.636 11.533l1.997-.446M25.024 17.744l1.997-.447M27.8 30.164l1.998-.447M13.583 39.353l13.813-3.089M29.157 33.12l1.336-.298M26.38 20.7l1.336-.298M26.413 23.954l1.997-.447M27.769 26.91l1.336-.297"
        />
      </svg>
    );
  },
);
export default SvgHammerOgLinjalOutline;
