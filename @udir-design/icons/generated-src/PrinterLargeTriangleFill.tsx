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
const SvgPrinterLargeTriangleFill = forwardRef<
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
          d="M16.538 2.136a.75.75 0 0 0-1.312 0l-5 9a.75.75 0 0 0 .656 1.114h10a.75.75 0 0 0 .656-1.114zm-4.688 2.45a.25.25 0 0 1 .107.346l-.486.875a.25.25 0 0 1-.33.102L6.665 3.67a.75.75 0 0 1 .67-1.342zM10.8 6.25a.25.25 0 0 1 .218.371l-2.103 3.786a2.25 2.25 0 0 0 1.967 3.343H16.5a.25.25 0 0 1 .25.25v1.131c0 .2.223.32.389.208l1.445-.963a.75.75 0 0 1 .832 1.248l-2.555 1.703a.25.25 0 0 0-.111.208V20a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75V7A.75.75 0 0 1 5 6.25zm-2.8 10a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPrinterLargeTriangleFill;
