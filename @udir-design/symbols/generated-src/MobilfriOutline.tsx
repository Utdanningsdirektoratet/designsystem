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
const SvgMobilfriOutline = forwardRef(
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
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.254}
          d="M14.968 10.832V9.708c0-.952.772-1.724 1.724-1.724h8.67c.952 0 1.724.772 1.724 1.724v15.683m-12.118-9.649v15.915c0 .952.772 1.724 1.724 1.724h8.67c.952 0 1.724-.772 1.724-1.724v-1.25"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.254}
          d="M15.53 11.5v-1.25c0-.175.143-.318.318-.318h10.36c.175 0 .317.143.317.318v14.484M15.53 16.5v13.25c0 .175.142.317.317.317h10.36a.317.317 0 0 0 .317-.317v-.047"
        />
        <path
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.19}
          d="M22.144 8.826h-2.233a.153.153 0 0 0 0 .305h2.233a.153.153 0 0 0 0-.306ZM21.027 32.49a.844.844 0 1 0 0-1.69.844.844 0 0 0 0 1.69Z"
        />
        <mask id="MobilfriOutline_svg__a" fill="#fff">
          <path
            fillRule="evenodd"
            d="M41 21c0 11.046-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1s20 8.954 20 20M30.53 34.869A16.75 16.75 0 0 1 21 37.825c-9.292 0-16.825-7.533-16.825-16.825 0-4.651 1.887-8.862 4.938-11.907zm2.72-2.334L11.902 6.844A16.75 16.75 0 0 1 21 4.173c9.292 0 16.825 7.534 16.825 16.826 0 4.465-1.738 8.523-4.576 11.535"
            clipRule="evenodd"
          />
        </mask>
        <path
          fill="#303030"
          d="m30.53 34.869.226.33.36-.25-.28-.336zM9.112 9.093l.307-.256-.28-.337-.31.31zm2.79-2.25-.217-.336-.38.245.29.347zm21.346 25.692-.307.255.288.348.31-.329zM21 41.4c11.267 0 20.4-9.133 20.4-20.4h-.8c0 10.825-8.775 19.6-19.6 19.6zM.6 21C.6 32.267 9.733 41.4 21 41.4v-.8C10.175 40.6 1.4 31.825 1.4 21zM21 .6C9.733.6.6 9.733.6 21h.8C1.4 10.175 10.175 1.4 21 1.4zM41.4 21C41.4 9.733 32.267.6 21 .6v.8c10.825 0 19.6 8.775 19.6 19.6zM21 38.225c3.621 0 6.982-1.117 9.756-3.027l-.454-.659A16.35 16.35 0 0 1 21 37.425zM3.775 21c0 9.513 7.712 17.225 17.225 17.225v-.8c-9.071 0-16.425-7.353-16.425-16.425zM8.83 8.81A17.17 17.17 0 0 0 3.775 21h.8c0-4.54 1.842-8.65 4.82-11.624zm22.007 25.803L9.42 8.837l-.615.511 21.417 25.776zM11.595 7.1 32.942 32.79l.615-.51L12.211 6.587zM21 3.775c-3.43 0-6.628 1.003-9.314 2.732l.434.673A16.35 16.35 0 0 1 21 4.575zM38.225 21c0-9.513-7.712-17.225-17.225-17.225v.8c9.072 0 16.425 7.353 16.425 16.425zm-4.684 11.809A17.17 17.17 0 0 0 38.225 21h-.8c0 4.358-1.697 8.32-4.467 11.26z"
          mask="url(#MobilfriOutline_svg__a)"
        />
      </svg>
    );
  },
);
export default SvgMobilfriOutline;
