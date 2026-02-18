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
const SvgPrveFill = forwardRef(
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
          strokeWidth={0.4}
          clipPath="url(#Pr\xF8veFill_svg__a)"
        >
          <path
            fill="#5BA27E"
            d="M11.808 6.135s-.646-1.493-1.215-2.678c-.568-1.185.117-2.423 1.52-2.456s2.034.745 2.564 2.013c.528 1.268 1.17 2.79 1.17 2.79z"
          />
          <path
            fill="#BFA687"
            d="m1.037 8.885 14.845 31.36a.756.756 0 0 0 .836.411l23.851-5.048a.55.55 0 0 0 .43-.537.54.54 0 0 0-.058-.237L25.956 5.662a.5.5 0 0 0-.23-.24.53.53 0 0 0-.33-.06L1.332 8.35a.377.377 0 0 0-.33.372.5.5 0 0 0 .036.162Z"
          />
          <path
            fill="#fff"
            d="m2.935 9.556-.008.004q-.005 0-.006.006c0 .003-.004.005-.001.008q-.001.004.001.008l13.505 28.02a.03.03 0 0 0 .015.016q.008.006.02.003l21.81-4.779.008-.004q.005-.002.006-.006.005-.003.001-.008.002-.006 0-.01L24.983 6.5q-.005-.008-.015-.015-.012-.006-.02-.003z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.91 9.558 13.516 28.045a.03.03 0 0 0 .015.015q.008.005.02.003l21.81-4.779"
          />
          <path
            fill="#76C69D"
            d="m7.853 7.535.638-.084.88 1.495a.46.46 0 0 0 .198.175c.08.038.173.049.258.033l9.762-1.793a.2.2 0 0 0 .078-.031.2.2 0 0 0 .057-.06.2.2 0 0 0 .029-.077.2.2 0 0 0-.006-.082l-.937-3.603a.43.43 0 0 0-.171-.246.42.42 0 0 0-.293-.065L7.495 4.703a.43.43 0 0 0-.363.403L7.08 6.682q.001.024.016.043z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.322 7.1 7.47 5.369M9.41 15.186s1.149-2.57 2.059-2.675 1.268 1.912 1.7 1.798c.432-.115.52-1.53 1.646-1.485 1.127.046 1.344.585 1.344.585s.957-.844 1.389-.958.632.57.632.57 1.128-1.203 2.175-.635 1.64.182 3.558-.312M11.538 19.755s1.514-.582 2.117-1.861c.603-1.28-1.523-1.591-1.352-.11.17 1.482 1.927 1.473 3.162.552s1.254-1.038 2.727-.73c1.472.306 1.372-.633 2.667-.95 1.296-.317 1.405.563 2.134.254q.686-.286 1.407-.448M14.256 23.753s.286-2.16 1.352-2.33 1.48.87 2.204.59c.725-.278.987-1.461 2.102-1.15 1.114.31 1.36.05 2.08-.38.719-.43 1.849-.236 1.849-.236M31.97 30.922c-1.833-3.766-3.432-7.676-3.432-7.676l-1.136 4.68s2.625-.354 4.341-1.283"
          />
        </g>
        <defs>
          <clipPath id="Pr\xF8veFill_svg__a">
            <path fill="#fff" d="M0 0h42v41.672H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgPrveFill;
