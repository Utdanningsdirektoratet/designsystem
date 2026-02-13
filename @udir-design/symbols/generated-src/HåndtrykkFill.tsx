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
const SvgHndtrykkFill = forwardRef(
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
    const __srcH = 26;
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
        viewBox="0 0 42 26"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g clipPath="url(#H\xE5ndtrykkFill_svg__a)">
          <path
            fill="#76C69D"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="m40.5 9.955-4.602-7.97a1 1 0 0 0-1.366-.367l-2.396 1.384a1 1 0 0 0-.366 1.366l4.602 7.97a1 1 0 0 0 1.366.366l2.396-1.383a1 1 0 0 0 .366-1.366Z"
          />
          <path
            fill="#BED5E8"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="m5.718 12.338 4.64-8.037a1 1 0 0 0-.365-1.366L7.507 1.5a1 1 0 0 0-1.366.366L1.5 9.903a1 1 0 0 0 .365 1.366l2.486 1.435a1 1 0 0 0 1.366-.366Z"
          />
          <path
            fill="#ECDBC2"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M6.211 12.965s8.632 8.553 12.304 10.056c2.675 1.095 5.013 2.505 6.02 1.239.642-.808-.6-1.798-3.755-3.579 0 0 5.492 2.843 6.698 1.788 1.16-1.014-.734-2.046-1.565-2.59-.758-.498-2.91-2.004-2.91-2.004s5.676 3.638 6.891 2.416c1.304-1.31-.592-2.253-1.305-2.728-.714-.475-3.922-2.776-3.922-2.776s5.84 4.675 7.96 3.128c1.564-1.142-1.921-3.177-2.798-3.703-3.825-2.295-7.528-5.526-9.559-7.023-1.69-1.247-2.771-.994-5.465-1.35s-3.683-1.466-3.683-1.466z"
          />
          <path
            fill="#BFA687"
            d="M30.997 4.425s-1.27.75-4.225.154c-2.924-.59-4.08-.947-9.023.044-.375.075-.712.28-.95.58-.513.647-1.54 2.033-3.104 4.55 0 0-.632 1.033.688.918 1.321-.114 3.848-1.951 4.193-2.756.222-.519 1.46-.917 1.694-.725 8.052 6.595 11.114 7.843 11.957 8.658l.675-.469c2.643-2.015 2.861-2.633 2.861-2.633z"
          />
          <path
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="M32.902 15.38c2.643-2.016 2.861-2.634 2.861-2.634l-4.766-8.32s-1.27.75-4.225.153c-2.924-.59-4.08-.947-9.023.044-.375.075-.712.28-.95.58-.513.647-1.54 2.033-3.104 4.55 0 0-.632 1.033.688.918 1.321-.114 3.848-1.951 4.193-2.756.222-.519 1.46-.917 1.694-.725 8.052 6.595 11.114 7.843 11.957 8.658m.675-.469-.675.469m.675-.469-.675.469"
          />
          <path
            fill="#BFA687"
            stroke="#303030"
            strokeMiterlimit={10}
            strokeWidth={0.4}
            d="m11.316 17.55-.762.948c-.499.62-1.325.785-1.844.367l-.161-.13c-.52-.418-.536-1.26-.037-1.88l.762-.948c.5-.62 1.456-1.17 2.097-.948.695.24.883 1.463-.054 2.59zM17.059 20.521l-1.798 2.472c-.392.54-1.347.622-1.853.145-.507-.478-.659-1.148-.267-1.687l1.747-2.403c.392-.539 1.544-1.615 2.394-.887.506.433.17 1.82-.222 2.36zM14.653 18.336l-2.173 2.988c-.402.553-1.219.82-1.7.47l-.376-.272c-.482-.35-.446-1.188-.044-1.74l2.173-2.988c.402-.552 1.677-1.694 2.497-1.045.467.37.025 2.035-.377 2.586zM19.006 22.662l-1.193 1.642a1.11 1.11 0 0 1-1.551.244l-.185-.133a1.11 1.11 0 0 1-.244-1.551l1.193-1.642c.36-.496 1.093-1.087 1.78-.785.784.344.561 1.73.2 2.225Z"
          />
        </g>
        <defs>
          <clipPath id="H\xE5ndtrykkFill_svg__a">
            <path fill="#fff" d="M0 0h41.999v25.761H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgHndtrykkFill;
