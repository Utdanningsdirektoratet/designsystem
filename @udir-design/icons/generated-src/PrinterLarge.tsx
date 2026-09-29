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
const SvgPrinterLarge = forwardRef<
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
          d="M6.33 2.665a.75.75 0 0 1 1.005-.336l7.842 3.921H16a.75.75 0 0 1 .75.75v5.599l1.834-1.223a.75.75 0 1 1 .832 1.248l-2.666 1.777V15.6l1.834-1.223a.75.75 0 1 1 .832 1.248l-2.666 1.777V20a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75V7A.75.75 0 0 1 5 6.25h6.823L6.665 3.67a.75.75 0 0 1-.336-1.005m8.685 5.085H5.75v11.5h9.5V7.75zM8 16.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPrinterLarge;
