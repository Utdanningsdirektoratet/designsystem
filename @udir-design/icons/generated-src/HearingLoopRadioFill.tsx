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
const SvgHearingLoopRadioFill = forwardRef<
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
          d="M3.547 6.8c.89-2.996 3.89-5.035 7.162-4.531a6.4 6.4 0 0 1 3.824 2.071.243.243 0 0 1-.013.334l-2.089 2.09a.266.266 0 0 1-.37-.004 3.417 3.417 0 0 0-5.779 2.471v1.77c0 .413.336.75.75.75.165 0 .218.193.102.31l-2.89 2.89a.232.232 0 0 1-.387-.238l.018-.06c.224-.725.407-1.517.407-2.12 0-.605-.183-1.397-.407-2.122-.309-1.004-.712-2.317-.328-3.61m12.299 3.62c.03-.03.08-.001.067.04l-2.196 7.467a5.326 5.326 0 0 1-7.964 2.994.24.24 0 0 1-.036-.373zm-4.82-2.572c.094.089.085.235-.006.326L8.654 10.54a.27.27 0 0 1-.315.04 3 3 0 0 0-.377-.169.27.27 0 0 1-.18-.246V9.23a1.917 1.917 0 0 1 3.245-1.383M18.26 4.47a.75.75 0 0 1 0 1.06l-15 15a.75.75 0 0 1-1.06-1.06l15-15a.75.75 0 0 1 1.06 0M18.75 21a.75.75 0 0 0-1.5 0v.05a.75.75 0 0 0 1.5 0zM18 19.25a1.24 1.24 0 0 0-.75.25.75.75 0 0 1-.901-1.2A2.74 2.74 0 0 1 18 17.75c.619 0 1.192.205 1.651.55a.75.75 0 0 1-.9 1.2 1.24 1.24 0 0 0-.75-.25m-1.949-1.85a3.23 3.23 0 0 1 1.95-.65c.732 0 1.405.241 1.948.65a.75.75 0 0 0 .901-1.2 4.73 4.73 0 0 0-2.85-.95 4.73 4.73 0 0 0-2.85.95.75.75 0 0 0 .901 1.2"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHearingLoopRadioFill;
