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
const SvgSaksFill = forwardRef(
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
    const __srcW = 45;
    const __srcH = 47;
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
        viewBox="0 0 45 47"
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
          d="m26.49 27.42 12.235 8.231s.14-.886-.66-1.558c-.802-.672-13.394-10.61-13.394-10.61l-4.037-9.593s-.779-1.695.643-4.408c2.054-3.92-2.079-8.347-6.112-6.083-2.996 1.681-3.226 6.836 1.02 8.279 1.397.473 2.69.267 4.149 3.664 1.495 3.48 2.222 5.832-.133 6.361-1.884.421-7.011-3.062-7.934-4.01-1.53-1.57-.48-2.677-2.122-4.571-1.412-1.628-5.438-1.926-6.553.838-1.2 2.973-.142 5.35 2.566 6.06 3.067.806 3.497-2.22 6.865-.448 3.61 1.9 9.153 5.512 9.153 5.512l8.208 14.27s.779 1.576 2.187 1.861l-6.083-13.794zM13.775 6.694c.324-2.04 2.176-3.438 4.139-3.126 1.962.312 3.289 2.217 2.964 4.257-.324 2.039-2.177 3.437-4.139 3.125s-3.289-2.217-2.964-4.256ZM6.519 19.267a3.327 3.327 0 1 1 1.047-6.57 3.327 3.327 0 0 1-1.047 6.57Zm15.08 4.203a.582.582 0 1 1 1.15.183.582.582 0 0 1-1.15-.183Z"
        />
      </svg>
    );
  },
);
export default SvgSaksFill;
