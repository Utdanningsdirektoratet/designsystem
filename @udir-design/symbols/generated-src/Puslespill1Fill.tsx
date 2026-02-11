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
const SvgPuslespill1Fill = forwardRef(
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
          strokeWidth={0.4}
          clipPath="url(#Puslespill1Fill_svg__a)"
        >
          <path
            fill="#E5CEAE"
            d="M21.182 21.124s-9.09-8.009-10.096-8.04C9.803 13.045 1 20.672 1 20.672v20.235L21.049 41l2.238-9.115-2.105-10.76z"
          />
          <path
            fill="#BED5E8"
            d="M21.45 1.052 1 1v20.072h6.702s1.894-.043 1.631-.59c-.18-.373-.76-.864-1.049-1.326-.318-.505-.525-1.465-.137-2.265.58-1.2 1.484-1.59 2.509-1.648.946-.054 2.013.055 2.852 1.213.73 1.006.118 2.217-.273 2.791s-1.039 1.19-.546 1.549c.544.398 2.595.292 3.117.292s5.375.036 5.375.036l1.448-10.747z"
          />
          <path
            fill="#76C69D"
            d="m40.999 21.329-5.39.64s.514 6.348-3.407 6.956c-3.506.542-11.021-7.8-11.021-7.8l.267-7.098s.119-1.475-.965-1.752c-.932-.239-1.394.286-1.669.707-.508.772-1.855.889-2.787.171-.878-.676-1.03-1.422-.847-2.886.182-1.465 1.13-2.17 2.08-2.187.808-.014 1.17.282 1.816.926.646.643 1.59.732 2.007.104s.31-1.615.331-2.48c.015-.63.035-5.577.035-5.577H41V21.33z"
          />
          <path
            fill="#7F99AE"
            d="M40.999 40.946 21.047 41v-6.697s.12-1.475-.965-1.752c-.931-.238-1.393.286-1.668.707-.509.772-1.856.889-2.787.171-.879-.676-1.03-1.422-.848-2.886s1.13-2.169 2.08-2.186c.809-.015 1.17.28 1.816.925.646.644 1.592.732 2.008.104.418-.628.31-1.614.331-2.48.015-.63.168-5.781.168-5.781l6.97.205s1.79.021 1.528.567c-.18.374-.683.905-.974 1.367-.317.505-.302 1.46-.082 2.008.495 1.237 1.337 1.587 2.362 1.645.947.054 2.068-.194 2.78-1.058.84-1.02.476-2.074.084-2.65-.393-.575-1.271-1.174-.779-1.533.545-.397 2.663-.36 3.185-.36s4.744.016 4.744.016V40.95z"
          />
        </g>
        <defs>
          <clipPath id="Puslespill1Fill_svg__a">
            <path fill="#fff" d="M0 0h42v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgPuslespill1Fill;
