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
const SvgMenneske11Fill = forwardRef(
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
    const __srcW = 25;
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
        viewBox="0 0 25 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeWidth={0.4}
          d="M12.51 19.147c-1.576.015-3.444-2.461-2.94-2.988.264-.276.576-2.497.576-2.929 0-.587 4.475-.425 4.525 0 .09.78.397 2.693.517 3.025.168.468-1.141 2.878-2.677 2.892Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeWidth={0.4}
          d="M9.627 13.035c-1.24-1.893-1.812-6.272-1.812-7.286C7.76 4.475 9.976 2.44 12.43 2.44c2.24 0 4.487 1.842 4.487 3.308 0 1.008-.44 5.48-1.622 7.286-.85 1.3-4.857 1.238-5.667 0Z"
        />
        <path
          fill="#5E4521"
          stroke="#303030"
          strokeWidth={0.4}
          d="M6.168 11.187c-.337.562 2.354.794 2.83.133.929-1.29-.593-5.186 1.268-5.421 1.457-.184 3.46-.549 3.332-2.75-5.37-2.073-4.287 3.478-6.228 3.478-.768 0 .224 2.18-1.202 4.56ZM18.755 11.399c.273.53-2.68.434-2.83-.317-.323-1.62.023-3.621-.3-4.3-.516-1.082-.233-1.908 0-2.31 1.835-.804 1.34 1.3 2.116 2.31.62.81.401 3.427 1.014 4.617Z"
        />
        <path
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.4}
          d="M22.46 18.473c-.928-.315-5.267-2.008-6.777-2.534 0 0-.74.818-3.246.8-2.487-.019-3.27-.92-3.27-.92-2.428.744-6.011 2.214-6.912 2.654-.196.095-1.105 1.852-1.22 3.76-.079 1.308 0 8.48 0 9.222 0 1.107 3.191 3.053 3.822 3.053.393 0 .393-8.797.393-10.251l.543 8.222-.936 8.127 6.6.394h1.798l6.428-.394-1.035-8.127v-8.222c.558 4.431.332 10.83 1.035 10.592 1.431-.486 3.69-2.184 3.69-3.394 0-.956-.5-12.842-.913-12.982Z"
        />
        <path
          fill="#D6B689"
          stroke="#303030"
          strokeWidth={0.4}
          d="m7.357 15.886-2.341.887.999 5.652-.764 2.066v6.696l-.459 5.51h5.74l1.233-1.455V21.648zM16.754 15.784l2.34.89-1.005 5.682.762 2.076.211 6.7.755 5.577h-6.26l-1.232-1.46V21.645zM12.586 1c-4.095.047-5.673 4.257-5.95 6.151 0 0 3.789-1.104 5.95-1.104S18.28 7.15 18.28 7.15c-.192-1.933-1.6-6.197-5.694-6.15Z"
        />
        <path
          fill="#937A57"
          stroke="#303030"
          strokeWidth={0.4}
          d="M12.555 6.013c2.175 0 5.718 1.138 5.718 1.138 0-.942-2.844-2.382-5.718-2.358-2.933.025-5.896 1.532-5.896 2.358 0 0 3.72-1.138 5.896-1.138Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M6.285 25.986c.825.224 2.816.502 4.178-.172"
        />
      </svg>
    );
  },
);
export default SvgMenneske11Fill;
