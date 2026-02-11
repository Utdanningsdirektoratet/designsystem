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
const SvgKokkehattOgStekespadeFill = forwardRef(
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
        viewBox="0 0 42 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <g
          stroke="#303030"
          strokeMiterlimit={10}
          clipPath="url(#KokkehattOgStekespadeFill_svg__a)"
        >
          <path
            fill="#D3E6F6"
            strokeWidth={0.4}
            d="M7.301 24.592s-2.314-3.807-2.452-4.64.799-1.63.354-2.888c-.444-1.258-5.489-4.68-3.892-5.373 1.597-.692.375-4.709 2.943-5.56 2.568-.85 2.91 1.421 4.932-.585 1.748-1.733 7.347-5.984 8.616-4.054s6.01-.05 7.603 2.112-3.54 6.004-1.972 8.523c1.811 2.909-.249 5.33.08 6.179.33.849.708 3.52.178 4.534l-9.268 2.973-6.507-.53-.617-.688z"
          />
          <path
            fill="#BED5E8"
            strokeWidth={0.4}
            d="M16.306 24.153c-1.858.263-4.148.21-5.783.668-1.635.46-2.929-.182-2.67 1.106.26 1.289-.152 3.97.355 5.313s-.258 1.896 1.26 2.169c1.518.272 5.541.464 9.02-.348s6.076-.907 6.417-2.295-.408-5.065-.848-5.136.514-2.652-.365-2.791c-.878-.14-2.914-.096-4.163.399-1.25.493-2.152.763-3.224.915z"
          />
          <path
            strokeWidth={0.2}
            d="M10.625 23.019s-1.733-2.069-1.25-4.663c.481-2.594-1.054-3.465-1.606-5.193M14.905 20.012s1.622-1.784.446-4.995c-1.608-4.391-1.364-7.905-.383-8.441M20.244 8.896c-1.69 4.804 1.509 4.427.127 8.662-.632 1.938.966 3.586.93 3.698M23.667 26.325s-1.098 1.658-9.02 2.505"
          />
          <path
            fill="#76C69D"
            strokeWidth={0.4}
            d="M37.244 5.668c-2.562-.643-4.344-1.332-5.003.881-1.155 3.872-1.763 6.128-1.47 7.368.321 1.353 1.869 3.953 1.116 7.43-.758 3.502-1.716 5.872-2.238 7.595-.586 1.935-2.603 7.702-2.772 9.158-.17 1.458-.13 2.663.662 2.872.793.209 1.557-.782 1.995-2.331.439-1.55 1.52-6.011 2.799-12.295s2.91-8.09 4.906-9.692c1.632-1.31 1.665-1.469 3.308-7.708.592-2.253-.743-2.636-3.305-3.278zM28.578 38.71c-.085.32-.235.545-.235.545-.06.068-.125.129-.387.06-.262-.068-.287-.145-.305-.231 0 0-.014-.288.062-.588.082-.326.228-.555.228-.555.051-.09.125-.108.387-.039s.34.125.333.223c0 0-.006.294-.082.585zm5.032-26.018c-.114.255-.233.495-.527.418s-.281-.315-.257-.587c0 0 .147-.937.414-1.966.29-1.115.606-1.95.606-1.95.115-.321.22-.426.515-.348.294.077.363.215.296.542 0 0-.174.968-.437 1.968-.29 1.099-.61 1.923-.61 1.923Zm2.372-1.612a35 35 0 0 1-.775 2.553c-.137.34-.277.662-.57.585-.295-.077-.263-.387-.218-.743 0 0 .225-1.231.58-2.593.384-1.476.774-2.588.774-2.588.143-.427.258-.57.553-.493s.354.25.26.682c0 0-.255 1.273-.604 2.597Zm2.139-1.366s-.174.967-.438 1.968c-.289 1.098-.61 1.922-.61 1.922-.114.255-.232.495-.526.418s-.282-.315-.257-.587c0 0 .147-.937.413-1.965.29-1.116.607-1.951.607-1.951.115-.321.22-.425.514-.348s.364.216.297.543Z"
          />
        </g>
        <defs>
          <clipPath id="KokkehattOgStekespadeFill_svg__a">
            <path fill="#fff" d="M0 0h41.686v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgKokkehattOgStekespadeFill;
