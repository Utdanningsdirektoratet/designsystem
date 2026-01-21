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
const SvgTrdsnelleOgBlyantFill = forwardRef(
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
    const __srcH = 42;
    const __isWide = true;
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
        viewBox="0 0 42 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M22.556 17.61c.163.47-1.827 1.586-4.445 2.491-2.619.906-4.873 1.257-5.036.786l-.353-1.023 9.48-3.277z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M22.146 16.423c.177.514-1.8 1.663-4.419 2.568-2.619.906-4.884 1.223-5.062.71l.316-1.64 7.905-2.732zM8.308 6.613l1.153 1.439 7.93-2.741.019-1.844z"
        />
        <path
          fill="#6D889D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M20.89 15.34s-1.484 1.063-3.783 1.858-4.122.875-4.122.875L9.338 7.522s2.115-.177 4.114-.897c2.043-.734 3.79-1.836 3.79-1.836z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M19.261 10.629c.163.472-1.474 1.465-3.657 2.22-2.183.754-4.085.984-4.248.512"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M19.077 10.096c.163.472-1.475 1.465-3.658 2.22-2.182.754-4.084.984-4.247.513"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M18.9 9.583c.162.471-1.475 1.465-3.658 2.22-2.183.754-4.084.984-4.247.512"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M18.71 9.034c.163.471-1.475 1.465-3.658 2.22-2.183.754-4.084.984-4.247.512"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M18.526 8.501c.163.472-1.475 1.466-3.658 2.22s-4.084.984-4.247.513"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M18.348 7.988c.163.471-1.474 1.465-3.657 2.22-2.183.754-4.085.984-4.248.512M19.803 12.196c.162.471-1.475 1.465-3.658 2.22-2.183.754-4.084.983-4.247.512"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M19.618 11.663c.163.471-1.474 1.465-3.657 2.22-2.183.754-4.085.984-4.247.512M20.161 13.233c.163.471-1.475 1.465-3.657 2.22-2.183.754-4.085.984-4.248.512"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M20.332 13.721c.163.472-1.475 1.466-3.658 2.22s-4.084.984-4.247.513"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M20.492 14.184c.162.472-1.475 1.465-3.658 2.22-2.183.754-4.084.984-4.247.512M19.977 12.7c.163.471-1.475 1.465-3.657 2.22-2.183.754-4.085.984-4.248.512M19.441 11.15c.163.471-1.474 1.465-3.657 2.22-2.183.754-4.085.984-4.248.512M18.162 7.45c.163.472-1.474 1.466-3.657 2.22s-4.084.985-4.247.513"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M17.978 6.918c.163.472-1.474 1.465-3.657 2.22-2.183.754-4.085.984-4.248.513"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M17.8 6.405c.164.472-1.474 1.465-3.657 2.22-2.182.754-4.084.984-4.247.513"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M17.637 5.927c.163.471-1.474 1.465-3.657 2.22-2.183.754-4.085.984-4.247.512"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M17.458 5.414c.163.472-1.474 1.465-3.657 2.22-2.183.754-4.084.984-4.247.513"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M17.31 4.988c.164.471-1.474 1.465-3.656 2.22-2.183.754-4.085.984-4.248.512"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M17.546 3.116c.163.471-1.827 1.587-4.445 2.492s-4.873 1.256-5.036.785L7.712 5.37l9.48-3.277z"
        />
        <path
          fill="#F2E8DA"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M12.717 4.498c2.618-.905 4.596-2.055 4.419-2.568-.178-.514-2.444-.196-5.062.709-2.618.904-4.596 2.054-4.419 2.568.178.513 2.444.196 5.062-.71Z"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.227}
          d="M12.52 3.926c1.007-.348 1.769-.791 1.7-.989s-.94-.075-1.948.273-1.77.791-1.701.989.94.075 1.948-.273Z"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.246}
          d="M29.775 2.42S28.348 5.83 24.378 5.83c-3.558-.135-6.25 1.23-6.25 1.23M12.163 15.487s-3.125 1.364-5.397 2.272c-5.681 2.273-9.465 8.758 0 13.351 5.755 2.792 2.852 6.446 8.404 9.09 6.603 3.145 12.762-5.544 18.737-4.07"
        />
        <path
          fill="#5BA27E"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.246}
          d="m36.155 32.017-2.917-.55s-.01-.004-.01-.007l4.3-23.18 3.062.576-4.424 23.157s-.006.005-.01.004Z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.246}
          d="m35.232 31.84-1.09-.206q-.002 0-.002-.006l4.339-23.172 1.143.215-4.385 23.164s-.003.005-.005.005Z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.246}
          d="m33.23 31.476.691 4.386 2.24-3.833s-.002-.011-.01-.013l-2.91-.547q-.01-.002-.012.007Z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.246}
          d="m33.636 33.988.285 1.875.948-1.644z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.246}
          d="m38.994 6.312.946.178c.585.11.97.673.86 1.259l-.207 1.104-.003.002-3.056-.575-.002-.003.208-1.107c.11-.583.672-.967 1.255-.857z"
        />
      </svg>
    );
  },
);
export default SvgTrdsnelleOgBlyantFill;
