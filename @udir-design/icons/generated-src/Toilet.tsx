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
const SvgToilet = forwardRef<
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
          d="m6.974 10.25-.463-5.5H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 0 1.5h-.51l-.464 5.5H18a.75.75 0 0 1 .75.75c0 1.56-1.216 2.949-2.81 3.796l.799 4.575a.75.75 0 0 1-.739.879H8a.75.75 0 0 1-.739-.88l.8-4.574C6.466 13.948 5.25 12.56 5.25 11a.75.75 0 0 1 .75-.75zm8.547 0 .463-5.5H8.016l.463 5.5zm-6.325 3.43c-1.176-.511-1.932-1.243-2.26-1.93h10.127c-.327.687-1.083 1.419-2.26 1.93a.75.75 0 0 0-.439.816l.743 4.254H8.893l.744-4.253a.75.75 0 0 0-.44-.817"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgToilet;
