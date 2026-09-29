import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgMicrobeFill = forwardRef<
  SVGSVGElement,
  SVGAttributes<SVGSVGElement> & SVGRProps
>(
  (
    { title, titleId: _titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    let titleId: string | undefined = useId().replace(/:/g, '');
    titleId = title ? (_titleId ? _titleId : 'title-' + titleId) : undefined;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 24 24"
        focusable={false}
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M11.25 3a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75m-6 9a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0m3.603-7.626a.75.75 0 1 0-.574-1.386l-.01.004a.75.75 0 1 0 .574 1.386zm-2.679.724a.75.75 0 0 1 0 1.061l-.007.007a.75.75 0 1 1-1.06-1.06l.006-.008a.75.75 0 0 1 1.061 0M3.976 7.854a.75.75 0 0 0-.98.405l-.004.01a.75.75 0 1 0 1.386.574l.004-.01a.75.75 0 0 0-.406-.98M3 11.24a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-1.5 0v-.01a.75.75 0 0 1 .75-.75m1.374 3.908a.75.75 0 1 0-1.386.574l.004.009a.75.75 0 0 0 1.386-.574zm.725 2.679a.75.75 0 0 1 1.06 0l.008.007a.75.75 0 1 1-1.06 1.06l-.008-.007a.75.75 0 0 1 0-1.06m2.755 2.197a.75.75 0 0 0 .406.98l.009.004a.75.75 0 1 0 .574-1.386l-.01-.004a.75.75 0 0 0-.98.406M11.24 21a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75m4.491.008a.75.75 0 1 0-.574-1.386l-.01.004a.75.75 0 1 0 .575 1.386zm3.163-3.174a.75.75 0 0 1 0 1.06l-.007.007a.75.75 0 0 1-1.06-1.06l.007-.007a.75.75 0 0 1 1.06 0m1.708-3.083a.75.75 0 0 0-.98.406l-.004.01a.75.75 0 1 0 1.386.573l.004-.009a.75.75 0 0 0-.406-.98M21 11.25a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V12a.75.75 0 0 1 .75-.75m.008-2.981a.75.75 0 1 0-1.386.574l.004.01a.75.75 0 1 0 1.386-.575zm-3.175-3.163a.75.75 0 0 1 1.061 0l.007.007a.75.75 0 1 1-1.06 1.06l-.008-.007a.75.75 0 0 1 0-1.06m-3.081-1.708a.75.75 0 0 0 .406.98l.009.004a.75.75 0 0 0 .574-1.386l-.01-.004a.75.75 0 0 0-.98.406"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMicrobeFill;
