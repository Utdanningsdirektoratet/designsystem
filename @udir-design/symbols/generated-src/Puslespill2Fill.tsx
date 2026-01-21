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
const SvgPuslespill2Fill = forwardRef(
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
        <g
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          clipPath="url(#Puslespill2Fill_svg__a)"
        >
          <path
            fill="#76C69D"
            d="m33 21.5-3.555-1.852s-1.329-.703-1.57-.304c-.411.68.08.934.2 1.398.119.463.02 1.665-1.306 2.121-1.395.48-2.607-.746-2.83-1.21-.342-.71-.14-2.103.85-2.564.553-.259 1.047-.199 1.038-.732-.012-.636-1.326-1.155-2.038-1.479-.578-.262-4.077-1.67-4.077-1.67l1.875-3.717s1.34-2.481.863-2.891c-.571-.492-1.083-.266-1.419-.062-.618.375-1.612.005-2.031-.815-.396-.772-.254-1.35.366-2.323s1.527-1.152 2.204-.845c.578.261.734.592.977 1.263.242.67.882 1.052 1.387.748.505-.303.76-1.035 1.064-1.64C25.22 4.486 26.89 1 26.89 1l13.656 6.474-6.778 14.34z"
          />
          <path
            fill="#E5CEAE"
            d="M16.817 25.678s-7.124-6.467-7.913-6.49C7.9 19.155 1 25.742 1 25.742v15.184L16.712 41l1.754-7.123-1.65-8.198z"
          />
          <path
            fill="#7F99AE"
            d="m32.347 40.958-15.636.04v-5.232s.093-1.152-.756-1.369c-.73-.186-1.092.224-1.308.552-.398.604-1.454.695-2.184.134-.688-.528-.808-1.11-.664-2.255.143-1.144.886-1.695 1.63-1.708.633-.012.917.22 1.423.723s1.247.572 1.573.081c.328-.49.243-1.261.26-1.938.011-.492.132-4.308.132-4.308l5.461-.05s1.404.018 1.198.444c-.141.292-.534.708-.762 1.069-.25.394-.238 1.14-.065 1.569.388.966 1.048 1.24 1.851 1.285.742.042 1.62-.152 2.18-.827.657-.797.372-1.62.064-2.07s-.996-.918-.61-1.198c.427-.31 2.087-.282 2.496-.282.41 0 3.717.157 3.717.157l.03 15.183z"
          />
          <path
            fill="#BED5E8"
            d="M17.232 9.784 1 9.744v15.998h5.252s1.548 0 1.34-.426c-.14-.292-.594-.51-.822-.871-.249-.395-.528-1.068-.1-2.017.35-.772 1.334-.99 2.217-.97.884.019 1.458.224 2.008 1.201.494.878.031 1.562-.39 1.89-.42.329-1.103.673-.772 1.017.447.466 7.083.112 7.083.112v-5.835s.034-1.044-.358-1.308c-.31-.208-.735-.105-.984.288-.489.773-1.836.96-2.684.25-.725-.607-.882-3.269.917-3.795 1.046-.306 1.954.966 2.537.94.582-.026.774-.568.791-1.017.073-1.815-.01-5.417-.01-5.417z"
          />
        </g>
        <defs>
          <clipPath id="Puslespill2Fill_svg__a">
            <path fill="#fff" d="M0 0h41.545v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgPuslespill2Fill;
