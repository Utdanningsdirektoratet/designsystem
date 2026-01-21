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
const SvgBkerOutline = forwardRef(
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
          stroke="#303030"
          strokeWidth={0.4}
          d="M38.867 23.997s-.357 2.023-.357 3.001c0 .98.208 2.835.208 2.835M6.184 15.637l-.914.171 10.437 9.505 24.496-1.45-3.828-2.538"
        />
        <path
          stroke="#303030"
          strokeWidth={0.2}
          d="M32.944 27.86v-2.22l2.437-.216.064 2.291-1.302-.942zM17.713 26.679l19.838-1.412M21.114 28.407l8.112-.587"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M4.553 16.707c0-.557.001-.881.735-.881l10.399 9.486c-.63.19-.622.569-.63.95v4.227c0 .42.34.848.931.819.59-.03 22.762-1.471 22.762-1.471l-.128-1.155 1.657 1.478s-24.586 1.632-24.985 1.632S6.2 22.53 4.863 20.945c-.31-.367-.31-.77-.31-1.028v-3.21Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.36}
          d="M36.336 16.557s-.212 2.162-.162 3.16c.05 1 .54 2.983.54 2.983M36.542 15.976l.643.464-21.447 1.367"
        />
        <path
          stroke="#303030"
          strokeWidth={0.18}
          d="m17.709 19.687 14.617-.984M21.5 21l9.003-.584"
        />
        <path
          stroke="#303030"
          strokeWidth={0.36}
          d="M5.934 11.16c-.037-.735.116-.8.392-.8l4.02 3.56 4.386 3.524h.461l.586.373c-.557.224-.599.558-.586.949l.216 4.314c.022.427.35.85.88.791.529-.058 20.426-1.227 20.426-1.227l-.186-.837 1.413 1.273s-21.895 1.3-22.253 1.318c-.359.02-8.079-7.06-9.363-8.614-.3-.363-.378-.973-.392-1.236-.037-.74.037-2.652 0-3.388ZM35.464 9.851s-.27 2.262-.23 3.14c.042.877.35 2.713.35 2.713"
        />
        <path
          stroke="#303030"
          strokeWidth={0.36}
          d="m23.317 4.226 12.652 5.829-21.143 1.489-8.853-6.436z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.18}
          d="m16.21 14.397 14.61-1.075M24.048 14.88l9-.642M18.186 12.895l15.034-1.11"
        />
        <path
          stroke="#303030"
          strokeWidth={0.36}
          d="M5.104 5.898c-.03-.647.051-.823.71-.863l8.996 6.53c-.558.206-.535.545-.526.888l.177 3.79c.017.376.341.742.87.684.53-.059 20.234-1.337 20.234-1.337l-.127-1.004 1.531 1.335S15.086 17.377 14.73 17.4c-.36.021-7.9-6.37-9.17-7.717-.293-.312-.31-.674-.32-.905l-.001-.007z"
        />
      </svg>
    );
  },
);
export default SvgBkerOutline;
