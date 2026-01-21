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
const SvgStekespadeBrun = forwardRef(
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
    const __srcW = 26;
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
        viewBox="0 0 26 42"
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
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M21.234 4.511c-2.4-1.352-4.003-2.536-5.275-.49-2.227 3.577-3.46 5.679-3.506 7.006-.05 1.45.792 4.491-.923 7.781-1.726 3.315-3.342 5.436-4.34 7.025-1.123 1.785-4.74 7.032-5.31 8.45-.571 1.42-.864 2.642-.124 3.071.74.428 1.781-.359 2.648-1.796s3.183-5.629 6.199-11.598 5.154-7.338 7.603-8.4c2.002-.867 2.08-1.018 5.449-6.843 1.216-2.103-.022-2.856-2.422-4.206ZM3.423 35.364c-.173.299-.387.484-.387.484-.078.051-.16.095-.405-.046s-.248-.226-.243-.317c0 0 .065-.293.224-.574.172-.305.382-.495.382-.495.076-.076.155-.074.4.067.245.14.308.22.274.316 0 0-.087.294-.244.566zm12.223-24.788c-.185.225-.37.434-.645.276-.274-.159-.197-.395-.097-.661 0 0 .405-.902.957-1.864.6-1.042 1.147-1.795 1.147-1.795.204-.291.339-.367.613-.209.274.159.307.317.149.628 0 0-.441.925-.982 1.86-.593 1.025-1.142 1.765-1.142 1.765Zm2.83-.968c-.785 1.356-1.483 2.354-1.483 2.354-.231.305-.46.59-.735.432-.274-.159-.157-.462-.013-.808 0 0 .564-1.176 1.296-2.448.793-1.379 1.49-2.39 1.49-2.39.262-.39.418-.503.693-.344.276.158.287.35.074.757 0 0-.607 1.211-1.322 2.447Zm2.527-.786s-.442.925-.982 1.86c-.593 1.025-1.142 1.765-1.142 1.765-.185.225-.37.434-.645.276-.275-.159-.197-.395-.097-.661 0 0 .405-.902.957-1.864a22 22 0 0 1 1.147-1.795c.204-.291.338-.367.613-.209.274.159.306.317.149.628Z"
        />
      </svg>
    );
  },
);
export default SvgStekespadeBrun;
