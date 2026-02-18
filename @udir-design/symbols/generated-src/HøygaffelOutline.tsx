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
const SvgHygaffelOutline = forwardRef(
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
    const __srcW = 15;
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
        viewBox="0 0 15 42"
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
          clipPath="url(#H\xF8ygaffelOutline_svg__a)"
        >
          <path d="M2.845 8.853c-.157-.773-.9-6.014-.956-6.371-.07-.46-.327-.606-.538-.535s-.4.236-.34.71c.048.363.635 6.3.672 6.678s.432 2.403 1.864 3.107c.666.327 1.775.547 2.768.408.992-.138 1.792-.482 2.38-1.002.55-.488.839-1.054 1.033-1.698.204-.675.167-1.553.05-2.276-.24-1.503-.776-4.494-1.124-6.307-.1-.529-.386-.61-.567-.55-.253.08-.408.24-.258 1.186.255 1.734.56 4.119.768 5.82.14 1.146.003 2.05-1.183 2.12-1.079.063-1.131-1.094-1.28-2.074-.148-.98-.928-6.357-.928-6.357s-.056-.625-.53-.542c-.299.052-.49.226-.432.675.042.333.945 6.865 1.035 7.511.116.848-.642 1.244-1.437 1.086-.683-.137-.878-1.006-.996-1.585z" />
          <path d="M5.2 12.869s.786.06 1.31-.047c.556-.113 1.081-.306 1.081-.306s2.285 17.743 2.518 19.561c.04.296.198 1.985.527 2.526.463.757 2.25 3.635 2.25 3.635l-1.892.284c-.054-.08-.591-1.64-1.315-1.588-.724.05-.82 1.932-.82 1.932l-2.004.322S7.923 35.67 8.2 34.9c.218-.608.017-1.972-.08-2.684-.202-1.454-2.92-19.347-2.92-19.349zM13.003 38.22l-6.284.99a.256.256 0 0 0-.214.293l.196 1.244c.022.14.154.235.294.213l6.284-.99a.257.257 0 0 0 .213-.293l-.195-1.244a.257.257 0 0 0-.294-.213Z" />
        </g>
        <defs>
          <clipPath id="H\xF8ygaffelOutline_svg__a">
            <path fill="#fff" d="M0 0h14.532v42H0z" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);
export default SvgHygaffelOutline;
