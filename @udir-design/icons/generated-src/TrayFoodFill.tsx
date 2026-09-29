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
const SvgTrayFoodFill = forwardRef<
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
          d="M9.444 5.497A.75.75 0 0 1 10 5.25h5a.75.75 0 0 1 .746.825l-.345 3.455a.26.26 0 0 1-.244.23 6.24 6.24 0 0 0-4.764 2.637c-.144.202-.494.128-.519-.12l-.044-.444-.576-5.758a.75.75 0 0 1 .19-.578M4.75 7a.75.75 0 0 0-1.5 0v.382c0 .663.374 1.269.967 1.565l.895.447a.25.25 0 0 1 .138.224V10a.75.75 0 0 0 1.5 0v-.382a1.75 1.75 0 0 0-.967-1.565l-.895-.447a.25.25 0 0 1-.138-.224zm-1.812 4.504a.75.75 0 0 1 .562-.254h5a.75.75 0 0 1 .744.843l-.28 2.248a2.75 2.75 0 0 1-2.73 2.409h-.468a2.75 2.75 0 0 1-2.73-2.409l-.28-2.248a.75.75 0 0 1 .182-.59M2.25 18a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m18.5-2a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.195-1.474 4.751 4.751 0 0 1 9.39 0 .75.75 0 0 1 .555.724"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTrayFoodFill;
