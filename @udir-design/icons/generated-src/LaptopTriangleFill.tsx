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
const SvgLaptopTriangleFill = forwardRef<
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
          d="M16.656 1.636a.75.75 0 0 0-1.312 0l-5 9A.75.75 0 0 0 11 11.75h10a.75.75 0 0 0 .656-1.114zM20.25 13.5a.25.25 0 0 0-.25-.25h-9a2.25 2.25 0 0 1-1.967-3.343l2.937-5.286a.25.25 0 0 0-.219-.371H5.5A1.75 1.75 0 0 0 3.75 6v9c0 .966.784 1.75 1.75 1.75h13A1.75 1.75 0 0 0 20.25 15zm-18 5.5a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLaptopTriangleFill;
