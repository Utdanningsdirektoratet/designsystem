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
const SvgDonutChartFill = forwardRef<
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
          d="M11.25 3.125a.75.75 0 0 0-.874-.74C5.764 3.159 2.25 7.168 2.25 12c0 2.105.668 4.056 1.803 5.65a.75.75 0 0 0 1.141.095l3.653-3.652a.75.75 0 0 0 .16-.824 3.251 3.251 0 0 1 1.774-4.283.75.75 0 0 0 .469-.695zm1.765-.573a.75.75 0 0 1 .61-.167 9.76 9.76 0 0 1 7.99 7.99.75.75 0 0 1-.74.875H15.71a.75.75 0 0 1-.695-.469 3.26 3.26 0 0 0-1.795-1.795.75.75 0 0 1-.469-.695V3.125c0-.221.097-.43.265-.573m1.999 10.667a.75.75 0 0 1 .695-.469h5.166a.75.75 0 0 1 .74.874c-.774 4.612-4.783 8.126-9.615 8.126a9.7 9.7 0 0 1-5.65-1.803.75.75 0 0 1-.095-1.141l3.653-3.653a.75.75 0 0 1 .823-.16 3.251 3.251 0 0 0 4.283-1.775"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDonutChartFill;
