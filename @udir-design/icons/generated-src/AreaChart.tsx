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
const SvgAreaChart = forwardRef<
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
          d="M2.352 4.621a.752.752 0 0 1 1.134-.192l6.766 5.69 10.43-4.8A.75.75 0 0 1 21.75 6v3.984l.001.008V19a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75V5.005zm7.299 6.953L3.75 6.611v8.048l3.27-2.007a.75.75 0 0 1 .859.052l2.346 1.863 10.025-5.03V7.17l-9.803 4.512a.75.75 0 0 1-.796-.107m.819 4.548 9.78-4.907v7.035H3.75v-1.83l3.607-2.215 2.31 1.834a.75.75 0 0 0 .803.083"
          clipRule="evenodd"
        />
        <path fill="currentColor" d="M2.25 5.005V5z" />
      </svg>
    );
  },
);
export default SvgAreaChart;
