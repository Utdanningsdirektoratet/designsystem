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
const SvgTableFill = forwardRef<
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
          d="M6 3.25A2.75 2.75 0 0 0 3.25 6v2c0 .138.112.25.25.25h17a.25.25 0 0 0 .25-.25V6A2.75 2.75 0 0 0 18 3.25zM14.25 10a.25.25 0 0 0-.25-.25h-4a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h4a.25.25 0 0 0 .25-.25zM16 20.75a.25.25 0 0 1-.25-.25V10a.25.25 0 0 1 .25-.25h4.5a.25.25 0 0 1 .25.25v8A2.75 2.75 0 0 1 18 20.75zM3.25 10a.25.25 0 0 1 .25-.25H8a.25.25 0 0 1 .25.25v10.5a.25.25 0 0 1-.25.25H6A2.75 2.75 0 0 1 3.25 18z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTableFill;
