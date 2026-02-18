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
const SvgTrdsnelleOutline = forwardRef(
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
    const __srcW = 42;
    const __srcH = 38;
    const __isWide = true;
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
        viewBox="0 0 42 38"
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
          d="m12.128 7.152 1.27 1.589M22.13 5.723l.02-2.035M25.974 16.84s-1.64 1.174-4.179 2.052-4.553.967-4.553.967L13.213 8.204s2.337-.196 4.545-.99c2.257-.812 4.187-2.029 4.187-2.029z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M24.174 11.636c.18.52-1.628 1.618-4.04 2.452-2.41.833-4.511 1.087-4.691.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.971 11.048c.18.52-1.629 1.618-4.04 2.451-2.411.834-4.512 1.088-4.692.567"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.775 10.48c.18.521-1.629 1.62-4.04 2.453s-4.512 1.087-4.692.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.565 9.874c.18.52-1.628 1.618-4.04 2.452-2.41.833-4.511 1.087-4.691.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.362 9.286c.18.52-1.629 1.618-4.04 2.452s-4.511 1.087-4.691.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M23.166 8.719c.18.52-1.629 1.618-4.04 2.452s-4.512 1.087-4.692.566M24.773 13.367c.18.52-1.63 1.618-4.04 2.451-2.411.834-4.512 1.088-4.692.567"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M24.57 12.778c.18.52-1.63 1.618-4.04 2.452-2.412.833-4.512 1.087-4.692.566M25.169 14.512c.18.52-1.63 1.618-4.04 2.452s-4.512 1.087-4.692.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M25.357 15.052c.18.52-1.629 1.618-4.04 2.452s-4.512 1.087-4.692.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M25.534 15.563c.18.52-1.63 1.618-4.04 2.452s-4.512 1.087-4.692.566M24.965 13.924c.18.52-1.629 1.618-4.04 2.451-2.41.834-4.511 1.088-4.691.567M24.373 12.211c.18.521-1.629 1.619-4.04 2.452s-4.511 1.087-4.691.566M22.961 8.126c.18.52-1.629 1.618-4.04 2.452s-4.512 1.087-4.692.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.758 7.537c.18.521-1.63 1.619-4.04 2.452-2.411.834-4.512 1.087-4.692.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.562 6.97c.18.521-1.63 1.619-4.04 2.452-2.411.834-4.512 1.087-4.692.567"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.38 6.442c.18.521-1.628 1.619-4.039 2.452-2.411.834-4.512 1.087-4.692.567"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.183 5.876c.18.52-1.628 1.618-4.04 2.452-2.41.833-4.511 1.087-4.691.566"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M22.02 5.405c.18.52-1.628 1.618-4.04 2.451-2.41.834-4.511 1.088-4.691.567"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m21.833 2.043.447 1.294c.18.52-2.018 1.753-4.91 2.753s-5.382 1.388-5.562.867l-.447-1.294"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M16.946 4.863c2.892-1 5.077-2.27 4.88-2.836-.195-.567-2.698-.217-5.59.783s-5.077 2.27-4.881 2.837 2.7.216 5.59-.784ZM27.367 18.055l.447 1.293c.18.521-2.017 1.753-4.91 2.753-2.892 1-5.381 1.388-5.561.867l-.448-1.294"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m25.97 16.83 1.392 1.208c.196.567-1.99 1.837-4.881 2.837-2.893 1-5.395 1.35-5.591.783l.348-1.81"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.3}
          d="M16.728 4.232c1.113-.385 1.954-.874 1.879-1.092-.076-.219-1.04-.084-2.153.301s-1.954.874-1.879 1.092c.076.219 1.04.084 2.153-.3Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="M36.31 3.582s-1.59 3.796-6.011 3.796c-3.962-.15-6.96 1.37-6.96 1.37M16.696 18.133s-2.97 1.122-7.423-1.105C5.26 15.021-.746 20.368 1.481 29.274c1.809 7.236 11.466 7.792 17.811 6.122C29.868 32.613 33.764 20.368 41 25.378"
        />
      </svg>
    );
  },
);
export default SvgTrdsnelleOutline;
