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
const SvgMenneske11Outline = forwardRef(
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
    const __srcW = 25;
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
        viewBox="0 0 25 42"
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
          d="M9.57 16.159c.264-.276.567-2.221.567-2.654m5.05 2.75c-.119-.332-.406-1.97-.496-2.75"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M8.887 11.437c.214.615.46 1.17.74 1.598.81 1.238 4.816 1.3 5.667 0 .3-.457.551-1.085.76-1.785"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M7.368 6.944c-.768 0 .226 1.864-1.2 4.244-.337.561 2.354.793 2.83.132.929-1.29-.597-4.8 1.264-5.034M17.792 6.953c.62.808.35 3.256.963 4.446.273.53-2.68.434-2.83-.317-.323-1.62-.02-3.967-.343-4.645M19.683 34.849c1.431-.486 3.69-2.184 3.69-3.394 0-.956-.5-12.842-.913-12.982-.495-.169-1.964-.73-3.455-1.296M4.857 34.508c-.631 0-3.822-1.946-3.822-3.053 0-.741-.079-7.914 0-9.222.115-1.908 1.024-3.665 1.22-3.76.447-.218 1.553-.69 2.851-1.2m2.592-.968c.514-.18 1.012-.346 1.47-.487 0 0 .782.902 3.269.92 2.505.02 3.246-.798 3.246-.798.2.07.45.16.736.265M5.304 36.645l-.446 3.961 6.6.394h1.798l6.428-.394-.517-4.064"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="m7.357 15.886-2.341.887.953 5.315-.718 2.08v7.019l-.459 5.51h5.74l1.233-1.455V21.648zM16.754 15.784l2.34.89-1.005 5.682.762 2.076.211 6.7.755 5.577h-6.26l-1.232-1.46V21.645zM12.586 1c-4.095.047-5.673 4.257-5.95 6.151 0 0 3.789-1.104 5.95-1.104S18.28 7.15 18.28 7.15c-.192-1.933-1.6-6.197-5.694-6.15Z"
        />
        <path
          stroke="#303030"
          strokeWidth={0.4}
          d="M12.555 6.013c2.175 0 5.718 1.137 5.718 1.137 0-.94-2.844-2.381-5.718-2.357-2.933.025-5.896 1.532-5.896 2.357 0 0 3.72-1.137 5.896-1.137ZM6.285 25.986c.825.224 2.816.502 4.178-.172"
        />
      </svg>
    );
  },
);
export default SvgMenneske11Outline;
