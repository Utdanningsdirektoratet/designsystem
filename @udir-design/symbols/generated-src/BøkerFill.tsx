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
const SvgBkerFill = forwardRef(
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
    const __srcW = 44;
    const __srcH = 40;
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
        viewBox="0 0 44 40"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#D3E6F6"
          stroke="#303030"
          strokeWidth={0.4}
          d="m38.724 23.492-.032.201c-.043.273-.101.647-.159 1.052-.115.804-.233 1.75-.233 2.256 0 .51.12 1.318.234 1.985.058.337.116.644.159.866l.024.124-23.774 1.546-.242-6.643z"
        />
        <path
          fill="#A9DBC2"
          stroke="#303030"
          strokeWidth={0.4}
          d="m25.715 15.32 13.98 8.477-23.99 1.484-10.2-9.444z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.2}
          d="M32.937 27.856v-2.218l2.437-.217.064 2.29-1.302-.941z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="m17.708 26.676 19.835-1.412M21.109 28.404l8.11-.588"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M4.55 16.705c0-.72.1-.911.834-.911l10.298 9.515c-.63.19-.622.569-.63.95v4.226c0 .42.341.848.932.819.59-.03 22.759-1.471 22.759-1.471l-.225-1.349 1.754 1.672s-24.584 1.632-24.983 1.632c-.398 0-9.091-9.262-10.43-10.846-.31-.366-.31-.77-.309-1.027v-3.21Z"
        />
        <path
          fill="#F2E8DA"
          stroke="#303030"
          strokeWidth={0.36}
          d="M36.165 16.341a87 87 0 0 0-.1 1.211c-.055.765-.106 1.669-.08 2.181.026.515.173 1.331.311 2.008.07.34.137.65.188.874l.032.146-21.155 1.414-.562-6.816z"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.36}
          d="m24.137 9.53 12.809 6.88-21.214 1.352-8.988-7.509z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.18}
          d="m17.704 19.685 14.615-.984M21.494 20.997l9.002-.583"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.36}
          d="M5.931 11.16c-.037-.737.043-.936.703-.97l9.072 7.573c-.556.224-.53.61-.517 1l.216 4.314c.021.427.35.85.879.791.53-.058 20.24-1.19 20.24-1.19l-.252-1.224 1.662 1.623s-21.891 1.3-22.25 1.318c-.358.019-7.973-7.372-9.257-8.925-.298-.36-.318-.772-.332-1.035v-.008z"
        />
        <path
          fill="#EAEAEA"
          stroke="#303030"
          strokeWidth={0.36}
          d="m35.251 10.045-.018.16a55 55 0 0 0-.088.876c-.062.672-.122 1.47-.1 1.925s.161 1.175.293 1.768c.066.299.132.57.18.766l.024.1-21.14 1.546-.497-5.941z"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.36}
          d="m23.311 4.226 12.648 5.826-21.136 1.49L5.97 5.109z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.18}
          d="m16.206 14.395 14.608-1.074M24.043 14.879l8.997-.642M18.18 12.894l15.033-1.11"
        />
        <path
          fill="#BFA687"
          stroke="#303030"
          strokeWidth={0.36}
          d="M5.1 5.898c-.03-.647.052-.823.712-.863l8.993 6.53c-.557.205-.535.544-.526.887l.177 3.79c.018.375.342.742.871.683.53-.059 20.23-1.336 20.23-1.336l-.241-1.073 1.646 1.404s-21.88 1.455-22.238 1.477-7.899-6.369-9.168-7.716c-.293-.312-.31-.674-.32-.905l-.001-.007z"
        />
      </svg>
    );
  },
);
export default SvgBkerFill;
