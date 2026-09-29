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
const SvgHandFingerFill = forwardRef<
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
          d="M7.25 5a2.75 2.75 0 1 1 5.5 0v4.398l5.484 1.22a3.75 3.75 0 0 1 2.848 4.473l-1.35 6.072a.75.75 0 0 1-.732.587H8a.75.75 0 0 1-.6-.3l-4.974-6.632a2.722 2.722 0 0 1 3.948-3.7l.876.751z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHandFingerFill;
