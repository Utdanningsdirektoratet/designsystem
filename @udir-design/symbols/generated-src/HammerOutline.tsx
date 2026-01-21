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
const SvgHammerOutline = forwardRef(
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
    const __srcW = 22;
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
        viewBox="0 0 22 42"
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
          clipPath="url(#HammerOutline_svg__a)"
        >
          <path d="m8.87 38.652-4.4-.635a.43.43 0 0 0-.485.363l-.208 1.44a.43.43 0 0 0 .363.484l4.4.635a.43.43 0 0 0 .485-.363l.208-1.439a.43.43 0 0 0-.363-.485Z" />
          <path d="m8.766 38.637-4.191-.604L9.157 8.544l3.548.513zM20.45 2.13l-2.562-.369a.403.403 0 0 0-.457.342l-.721 5a.403.403 0 0 0 .341.456l2.562.37a.403.403 0 0 0 .457-.341l.721-5a.403.403 0 0 0-.341-.457Z" />
          <path d="M4.361 2.43C2.172 4.468 1.345 5.732 1.06 6.64c-.286.91.496 1.085 1.647.238C4.104 5.85 7.21 3.455 8.722 5.488c.68.914.435 3.057.435 3.057l3.548.511s.58-2.956 1.589-2.936c1.364.028.913.809 1.425.94.22.056.978.129.978.129l.743-5.147-.97-.152c-.688-.07-.456.804-1.6.611-.949-.16-.515-.917-1.193-1.014-2.175-.315-6.907-1.298-9.316.944Z" />
        </g>
        <defs>
          <clipPath id="HammerOutline_svg__a">
            <path fill="#fff" d="M0 0h21.849v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgHammerOutline;
