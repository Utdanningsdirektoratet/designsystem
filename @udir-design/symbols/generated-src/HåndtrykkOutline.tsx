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
const SvgHndtrykkOutline = forwardRef(
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
        viewBox="0 0 42 26"
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
          clipPath="url(#H\xE5ndtrykkOutline_svg__a)"
        >
          <path d="m40.5 9.953-4.6-7.969a1 1 0 0 0-1.367-.366l-2.396 1.384a1 1 0 0 0-.366 1.366l4.6 7.968a1 1 0 0 0 1.367.366l2.396-1.383a1 1 0 0 0 .366-1.366ZM5.718 12.334 10.36 4.3a1 1 0 0 0-.366-1.366L7.507 1.5a1 1 0 0 0-1.366.366L1.5 9.9a1 1 0 0 0 .365 1.366L4.352 12.7a1 1 0 0 0 1.366-.366ZM18.613 23.057c2.675 1.094 4.916 2.462 5.922 1.196.642-.808-.599-1.797-3.755-3.577 0 0 5.493 2.842 6.699 1.787 1.16-1.014-.734-2.046-1.565-2.59-.758-.497-2.91-2.002-2.91-2.002s5.676 3.636 6.891 2.415c1.304-1.31-.592-2.253-1.305-2.728-.714-.474-3.923-2.775-3.923-2.775s5.841 4.673 7.96 3.127c1.565-1.141-1.92-3.176-2.797-3.702-3.825-2.294-7.528-5.524-9.559-7.021m-4.086-1.198a35 35 0 0 1-1.38-.152c-2.693-.357-3.682-1.465-3.682-1.465l-4.911 8.59s1.286 1.274 3.077 2.925m1.95 1.762c.11.098.25.218.396.346m2.023 1.717q.23.188.46.372" />
          <path d="M32.903 15.375c2.643-2.014 2.861-2.632 2.861-2.632l-4.766-8.319s-1.27.75-4.225.154c-2.925-.59-4.08-.947-9.024.044-.375.075-.711.28-.949.58-.514.646-1.541 2.032-3.105 4.548 0 0-.632 1.033.689.919 1.32-.115 3.847-1.951 4.192-2.756.223-.519 1.461-.917 1.695-.725 8.052 6.593 11.114 7.841 11.956 8.656m.676-.469-.675.469m.675-.469-.675.469M11.317 17.545l-.762.947c-.5.62-1.326.785-1.845.367l-.16-.13c-.52-.417-.537-1.258-.038-1.88l.762-.947c.5-.62 1.457-1.17 2.098-.947.694.24.882 1.463-.054 2.589zM17.06 20.515l-1.798 2.471c-.392.539-1.348.622-1.854.145-.507-.478-.658-1.148-.266-1.686l1.747-2.402c.392-.539 1.544-1.614 2.393-.887.507.433.17 1.818-.222 2.358zM14.654 18.331l-2.174 2.986c-.401.553-1.218.82-1.7.47l-.375-.272c-.482-.35-.446-1.187-.044-1.74l2.173-2.985c.402-.553 1.676-1.694 2.496-1.045.467.37.026 2.034-.376 2.585zM19.007 22.656l-1.194 1.64a1.11 1.11 0 0 1-1.551.245l-.184-.134a1.11 1.11 0 0 1-.245-1.55l1.194-1.64c.36-.496 1.092-1.087 1.78-.786.784.344.561 1.73.2 2.225Z" />
        </g>
        <defs>
          <clipPath id="H\xE5ndtrykkOutline_svg__a">
            <path fill="#fff" d="M0 0h41.998v25.76H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgHndtrykkOutline;
