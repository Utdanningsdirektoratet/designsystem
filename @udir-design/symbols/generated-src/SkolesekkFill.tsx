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
const SvgSkolesekkFill = forwardRef(
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
    const __srcW = 38;
    const __srcH = 42;
    const __isWide = false;
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
        viewBox="0 0 38 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          d="M2.143 5.363C1.615 6.013 1.067 7.391 1 9.08c.003.234.024.495.049.737.212 2.034 6.249 25.123 6.385 27.223.139 2.101 1.146 2.228 1.87 2.41.735.182 1.62 1.114 3.223 1.344 1.604.236 2.196.406 5.072-.291 2.875-.695 6.08-1.307 7.38-1.628 1.301-.322 4.22-.676 6.061-.97 1.84-.292 2.856-1.508 3.766-3.069.485-.836.549-2.061.442-3.214-.108-.9-.29-1.789-.545-2.658-.51-1.58-4.379-15.17-4.67-15.86-.297-.692-1.513-2.79-1.513-2.79s.532-1.143.168-2.916c-.361-1.774-1.437-2.69-3.976-4.124-2.537-1.44-4.084-2.468-7.145-1.92-3.07.553-5.71.786-8.517 1.553-2.823.776-6.182 1.559-6.907 2.456Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m3.632 8.774 5.69 20.64"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M18.303 12.992c1.91-.419 10.205-2.665 10.205-2.665.283-.416.474-.886.561-1.377.088-.494.073-1-.045-1.486-.364-1.773-1.586-2.932-4.124-4.372S20.626.597 17.557 1.15c-3.068.551-5.715.854-8.522 1.622-2.81.77-6.237 1.634-6.97 2.532C1.54 5.948.987 7.373 1 9.08l.698-.096S1.818 6.846 3.359 6c2.935-1.617 3.03 2.932 8.056 6.082 2.274 1.428 4.975 1.325 6.888.91ZM16.347 19.474c-1.924.697-1.54 4.08-1.158 5.587.376 1.507 1.368 5.073 2.483 6.622 1.113 1.553 2.681 2.392 6.086 1.864 3.401-.524 10.653-2.23 11.206-2.467.548-.237 1.973-2.508 1.548-4.354-.424-1.847-1.864-4.697-2.094-5.321-.23-.625-.091-2.84-.98-3.7-.891-.866-1.603-1.312-2.483-1.3-.873.018-11.915 2.089-14.608 3.069Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m15.72 24.47 18.64-3.295"
        />
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M4.881 28.2q.004-.01.018-.012c.321-.064 7.64-1.541 7.835-1.53.193.014 3.165 9.7 2.983 11.51s-3.183 3.505-6.543 2.29c-3.36-1.226-3.199-1.683-3.626-4.542-.43-2.856-1.128-5.734-1.152-6.404.024-.476.19-.934.485-1.312Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m1.698 8.983 5.649-.746"
        />
      </svg>
    );
  },
);
export default SvgSkolesekkFill;
