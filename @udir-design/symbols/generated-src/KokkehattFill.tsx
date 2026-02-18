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
const SvgKokkehattFill = forwardRef(
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
          fill="#C8DEF0"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M8.721 29.909s-2.836-4.666-3.004-5.686.978-1.997.434-3.539c-.545-1.54-6.726-5.735-4.77-6.583s.46-5.77 3.607-6.813 3.565 1.74 6.043-.718c2.141-2.123 9.002-7.332 10.557-4.967 1.555 2.364 7.365-.061 9.316 2.587s-4.337 7.358-2.416 10.445c2.22 3.564-.304 6.531.1 7.571.403 1.04.867 4.313.217 5.556l-11.357 3.643-7.973-.65-.757-.843z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M19.756 29.37c-2.277.323-5.083.257-7.086.82-2.004.564-3.59-.224-3.272 1.355s-.188 4.865.434 6.51c.621 1.645-.315 2.323 1.544 2.657 1.86.334 6.79.57 11.053-.426 4.261-.995 7.446-1.112 7.863-2.812.419-1.7-.5-6.207-1.039-6.294s.63-3.249-.447-3.42-3.571-.117-5.102.49c-1.53.604-2.637.934-3.95 1.12z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.245}
          d="M12.794 27.98s-2.123-2.534-1.532-5.713c.59-3.178-1.29-4.245-1.967-6.362M18.039 24.297s1.987-2.187.546-6.122c-1.97-5.38-1.672-9.685-.47-10.342M24.58 10.675c-2.069 5.887 1.85 5.425.157 10.614-.775 2.376 1.184 4.394 1.14 4.532M28.775 32.033S27.43 34.064 17.722 35.1"
        />
      </svg>
    );
  },
);
export default SvgKokkehattFill;
