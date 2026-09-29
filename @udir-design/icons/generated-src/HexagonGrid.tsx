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
const SvgHexagonGrid = forwardRef<
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
          d="M9.6 2.532a.75.75 0 0 1 .65-.375h3.5a.75.75 0 0 1 .65.375l1.533 2.656H19a.75.75 0 0 1 .65.375l1.75 3.03a.75.75 0 0 1 0 .75L19.866 12l1.534 2.656a.75.75 0 0 1 0 .75l-1.75 3.031a.75.75 0 0 1-.65.375h-3.067L14.4 21.468a.75.75 0 0 1-.65.375h-3.5a.75.75 0 0 1-.65-.375l-1.533-2.656H5a.75.75 0 0 1-.65-.375L2.6 15.406a.75.75 0 0 1 0-.75L4.134 12 2.6 9.344a.75.75 0 0 1 0-.75l1.75-3.031A.75.75 0 0 1 5 5.188h3.067zM5.433 12.75h2.634l1.317 2.281-1.317 2.281H5.433l-1.317-2.281zm2.634-1.5 1.317-2.281-1.317-2.281H5.433l-1.317 2.28 1.317 2.282zm5.25 3.031h-2.634L9.366 12l1.317-2.281h2.634L14.634 12zm2.616-1.531h2.634l1.317 2.28-1.317 2.282h-2.634l-1.317-2.281zm2.634-1.5 1.317-2.281-1.317-2.281h-2.634l-1.317 2.28 1.317 2.282zm-7.884 4.531-1.317 2.281 1.317 2.281h2.634l1.317-2.28-1.317-2.282zm0-12.124-1.317 2.28 1.317 2.282h2.634l1.317-2.281-1.317-2.281z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHexagonGrid;
