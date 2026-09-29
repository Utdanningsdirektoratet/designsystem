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
const SvgHearingLoopFill = forwardRef<
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
          d="M10.709 2.269C7.436 1.765 4.436 3.804 3.547 6.8c-.384 1.294.02 2.607.328 3.611.224.725.407 1.517.407 2.121s-.183 1.396-.407 2.121l-.018.06a.232.232 0 0 0 .387.237l2.89-2.89c.116-.116.063-.31-.102-.31a.75.75 0 0 1-.75-.75V9.231a3.417 3.417 0 0 1 5.779-2.47c.103.099.269.104.37.002l2.09-2.089a.243.243 0 0 0 .012-.334 6.4 6.4 0 0 0-3.824-2.071m5.205 8.19c.011-.04-.038-.07-.068-.04L5.717 20.55a.24.24 0 0 0 .036.372 5.326 5.326 0 0 0 7.964-2.994zM11.02 8.175c.091-.09.1-.237.007-.326a1.917 1.917 0 0 0-3.245 1.384v.933c0 .111.075.209.18.246q.195.07.377.17a.27.27 0 0 0 .315-.041zm7.24-2.644a.75.75 0 0 0-1.06-1.06l-15 15a.75.75 0 1 0 1.06 1.06zm.49 11.22H20a.75.75 0 0 0 0-1.5h-4a.75.75 0 0 0 0 1.5h1.25V21a.75.75 0 0 0 1.5 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHearingLoopFill;
