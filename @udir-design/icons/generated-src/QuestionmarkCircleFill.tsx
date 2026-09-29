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
const SvgQuestionmarkCircleFill = forwardRef<
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
          d="M12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75m0-14a1.75 1.75 0 0 0-1.75 1.75.75.75 0 0 1-1.5 0A3.25 3.25 0 0 1 12 6.25h.136a3.114 3.114 0 0 1 1.945 5.545l-.441.354A2.37 2.37 0 0 0 12.75 14a.75.75 0 0 1-1.5 0 3.87 3.87 0 0 1 1.453-3.023l.441-.353a1.614 1.614 0 0 0-1.008-2.874zm-.95 9.15a.95.95 0 1 1 1.9 0 .95.95 0 0 1-1.9 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgQuestionmarkCircleFill;
