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
const SvgPencilWritingFill = forwardRef<
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
          d="M14.97 4.47a3.2 3.2 0 0 1 4.562.001c1.26 1.27 1.268 3.368-.002 4.637l-.577.578a.5.5 0 0 1-.707 0l-3.893-3.893a.5.5 0 0 1 0-.707zm2.215 6.276a.5.5 0 0 1 0 .708l-6.155 6.154a.75.75 0 0 1-.38.204l-4.5.922a.75.75 0 0 1-.882-.897l1-4.5a.75.75 0 0 1 .202-.367l6.115-6.116a.5.5 0 0 1 .707 0zM3.5 20.25a.75.75 0 0 0 0 1.5h17a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPencilWritingFill;
