import {
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
const SvgDonutChart = forwardRef<
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
          d="M11.25 3.125a.75.75 0 0 0-.874-.74C5.764 3.159 2.25 7.168 2.25 12c0 2.105.668 4.056 1.803 5.65a.75.75 0 0 0 1.141.095l3.653-3.652a.75.75 0 0 0 .16-.824 3.251 3.251 0 0 1 1.774-4.283.75.75 0 0 0 .469-.695zM3.75 12a8.254 8.254 0 0 1 6-7.94v3.756a4.75 4.75 0 0 0-2.3 5.552l-2.655 2.655A8.2 8.2 0 0 1 3.75 12m9.266-9.448a.75.75 0 0 1 .608-.167 9.76 9.76 0 0 1 7.991 7.99.75.75 0 0 1-.74.875H15.71a.75.75 0 0 1-.695-.469 3.26 3.26 0 0 0-1.795-1.795.75.75 0 0 1-.469-.695V3.125c0-.221.097-.43.265-.573M14.25 4.06v3.756a4.77 4.77 0 0 1 1.934 1.934h3.756a8.27 8.27 0 0 0-5.69-5.69m.764 9.159a.75.75 0 0 1 .695-.469h5.166a.75.75 0 0 1 .74.874c-.774 4.612-4.783 8.126-9.615 8.126a9.7 9.7 0 0 1-5.65-1.803.75.75 0 0 1-.095-1.141l3.653-3.653a.75.75 0 0 1 .823-.16 3.251 3.251 0 0 0 4.283-1.775m1.17 1.031a4.75 4.75 0 0 1-5.552 2.3l-2.655 2.655A8.254 8.254 0 0 0 19.94 14.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDonutChart;
