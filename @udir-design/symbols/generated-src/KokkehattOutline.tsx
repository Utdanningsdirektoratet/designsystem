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
const SvgKokkehattOutline = forwardRef(
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
          d="M28.805 27.762c.65-1.243.186-4.516-.218-5.556-.403-1.04 2.12-4.007-.099-7.571-1.92-3.087 4.367-7.796 2.416-10.445-1.95-2.648-7.761-.223-9.316-2.587S13.172 4.447 11.031 6.57c-2.478 2.459-2.896-.325-6.043.718S3.338 13.253 1.38 14.1c-1.956.848 4.225 5.042 4.77 6.583s-.602 2.518-.434 3.539c.168 1.02 3.004 5.686 3.004 5.686l-.003.003.757.843"
        />
        <path
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
export default SvgKokkehattOutline;
