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
const SvgMenneske1Brun = forwardRef(
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
    const __srcW = 16;
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
        viewBox="0 0 16 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="#E5CEAE"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m7.567 22.75.91 15.593c.036.17.044.375-.02.51-.098.204-.146.957-.012 1.034.768.442.915.965 1.493 1.083.578.12 1.823-.12 1.536-.694-.38-.758-1-1.156-1.042-1.482-.052-.396.237-.613.21-1.02-.038-.577.344-17.272 1.078-16.853.195.111.595.04.595.04s.178 1.424.388 1.581.145-.327.442-.194c.26.115.47.708.753.415.429-.442-.428-2.133-.428-2.133.223-.103.4-.183.502-.218.358-.124-.53-2.624-.9-4.81-.246-1.456-1.138-6.23-2.06-7.074-.457-.417-2.407-.648-2.489-.876-.099-.28-.108-1.012.072-1.462l1.508-.218s-.135-.367-.137-.901c-.005-1.33-.117-3.696-1.925-4.036A2.3 2.3 0 0 0 7.617 1h-.18c-.141 0-.283.009-.422.035-1.809.34-1.92 2.706-1.926 4.036-.002.535-.137.901-.137.901l1.509.218c.18.45.17 1.182.07 1.462-.08.229-2.03.459-2.488.876-.921.843-1.813 5.618-2.06 7.075-.37 2.185-1.257 4.685-.9 4.809.102.035.28.115.502.218 0 0-.856 1.69-.428 2.133.283.293.493-.3.753-.415.297-.133.232.352.442.194s.389-1.58.389-1.58.4.07.594-.04c.735-.42 1.117 16.275 1.078 16.852-.026.407.262.623.21 1.02-.042.326-.663.725-1.041 1.482-.287.574.957.813 1.535.694.578-.12.726-.642 1.494-1.083.134-.077.086-.829-.012-1.034-.064-.135-.057-.34-.02-.51l.91-15.594c.002-.048.073-.048.076 0z"
        />
      </svg>
    );
  },
);
export default SvgMenneske1Brun;
