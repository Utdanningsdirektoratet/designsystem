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
const SvgPresentationFill = forwardRef<
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
          d="M3 4.25a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75V5a.75.75 0 0 0-.75-.75zM3.25 10a.25.25 0 0 1 .25-.25h17a.25.25 0 0 1 .25.25v6a.75.75 0 0 1-.75.75h-4.023l.524 1.954a.75.75 0 1 1-1.449.388l-.627-2.342h-4.85l-.627 2.342a.75.75 0 0 1-1.449-.388l.524-1.954H4a.75.75 0 0 1-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPresentationFill;
