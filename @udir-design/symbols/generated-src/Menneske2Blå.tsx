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
const SvgMenneske2Bl = forwardRef(
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
          fill="#BED5E8"
          stroke="#303030"
          strokeMiterlimit={10}
          strokeWidth={0.4}
          d="m7.49 23.72.695 14.748c.034.161.32.358.259.486-.093.195-.25.912-.123.985.732.421 1.095.92 1.646 1.032.551.114 1.904-.114 1.63-.661-.36-.722-1.175-1.102-1.215-1.413-.049-.377.394-.583.367-.971-.036-.55.569-13.507.471-16.061-.008-.214.678.038.678.038s-.042.632-.088.908c-.042.247.42.241.704.368.248.11-.042.81.337.72.889-.215.316-2.423.316-2.423.211-.098.38-.23.478-.264.34-.118-.313-4.996-.666-7.078-.235-1.388-.775-4.557-1.654-5.36-.435-.398-2.061-.228-2.963-.873-.245-.175.08-1.42.08-1.42.257-.099.602-.125.672-.521.048-.278.018-1.166.352-1.19.385-.027.57-1.031.174-1.295l.314-1.235C8.894 2.043 9.26.903 7.375 1.007h-.003c-1.91.064-2.243.769-2.27 1.384l.006 1.084c-.396.264-.21 1.269.174 1.295.334.024.304.912.352 1.19.07.396.415.423.672.52.182.456.317 1.246.072 1.421-.901.645-2.528.475-2.963.873-.878.803-1.42 3.972-1.654 5.36-.353 2.082-1.006 6.96-.665 7.078.097.034.266.166.478.264 0 0-.574 2.208.315 2.422.378.091.09-.608.338-.72.283-.125.745-.12.704-.367-.046-.276-.089-.908-.089-.908s.686-.252.678-.038c-.097 2.554.508 15.511.47 16.06-.025.389.417.594.368.973-.04.31-.855.69-1.216 1.412-.273.547 1.08.775 1.631.661s.915-.611 1.646-1.032c.128-.073-.03-.79-.122-.985-.062-.128.224-.325.258-.486l.695-14.747a.12.12 0 0 1 .238 0z"
        />
      </svg>
    );
  },
);
export default SvgMenneske2Bl;
