import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  /**
   * @deprecated Use `aria-label` for an accessible name, and the `Tooltip` component from `@udir-design/react` for a tooltip. Will be removed in the next major version.
   */
  title?: string;
  /**
   * @deprecated Only used by the deprecated `title` prop. Will be removed in the next major version.
   */
  titleId?: string;
}
const SvgPieChartFill = forwardRef<
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
          d="M10.98 2.303c.146-.015.27.1.27.245V12c0 .199.079.39.22.53l6.683 6.684a.245.245 0 0 1-.017.363A9.7 9.7 0 0 1 12 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-5.04 3.825-9.188 8.73-9.697m2.04 0a.245.245 0 0 0-.27.245v9.038c0 .066.026.13.073.177l6.39 6.39a.245.245 0 0 0 .364-.017A9.7 9.7 0 0 0 21.75 12c0-5.04-3.825-9.188-8.73-9.697"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPieChartFill;
