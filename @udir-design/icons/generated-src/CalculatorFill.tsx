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
const SvgCalculatorFill = forwardRef<
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
          d="M4.25 4c0-.966.784-1.75 1.75-1.75h12c.966 0 1.75.784 1.75 1.75v16A1.75 1.75 0 0 1 18 21.75H6A1.75 1.75 0 0 1 4.25 20zM8 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0m1 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0m4-7a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0m1 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m2-5a1 1 0 1 1 2 0 1 1 0 0 1-2 0m1 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0M8.5 6.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCalculatorFill;
