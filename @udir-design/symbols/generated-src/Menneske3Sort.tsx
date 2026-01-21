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
const SvgMenneske3Sort = forwardRef(
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
        viewBox="0 0 15 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#303030"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.402}
          d="m7.478 23.257.718 15.215c.033.16.52.358.46.486-.089.194-.24.91-.117.983.7.42 1.048.917 1.576 1.03.527.114 1.822-.114 1.56-.66-.345-.72-1.338-1.1-1.377-1.41-.046-.377.537-.583.512-.97-.035-.549.152-13.236.504-16.035.027-.212.649.038.649.038s-.04.632-.084.907c-.04.246.19.241.46.367.238.11.31 1.026.536.718.658-.899.302-2.42.302-2.42.203-.098.365-.23.457-.263.326-.117-.62-4.427-.957-6.506-.226-1.386-.808-4.766-1.649-5.568-.416-.397-1.702-.571-2.565-1.215-.148-.11-.162-.884.047-1.135.261-.315.349-.574.42-.692.267-.44.881-.178.881-.178s.24-1.13.132-2.79C9.844 1.632 8.23.548 7.35 1.185c-2.423-.465-2.301.9-2.71 1.833s.258 2.988.258 2.988.606-.32.872.12c.071.118.118.412.363.692.216.246.252 1.025.105 1.135-.863.644-2.148.818-2.565 1.215-.841.802-1.424 4.182-1.649 5.568-.337 2.08-1.284 6.388-.957 6.506.093.034.255.166.457.264 0 0-.356 1.52.302 2.419.226.308.298-.608.536-.718.27-.126.5-.12.46-.367a14 14 0 0 1-.084-.907s.622-.25.649-.038c.352 2.8.539 15.487.504 16.035-.025.387.558.593.512.97-.039.31-1.032.69-1.377 1.41-.263.546 1.033.774 1.56.66.528-.112.875-.61 1.576-1.03.122-.073-.029-.788-.117-.983-.06-.128.427-.325.46-.486l.718-15.215a.128.128 0 0 1 .255 0z"
        />
      </svg>
    );
  },
);
export default SvgMenneske3Sort;
