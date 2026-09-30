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
const SvgHeadCloud = forwardRef<
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
          d="M12.33 2.992a.75.75 0 0 1-.607.87A7.25 7.25 0 0 0 5.75 11v.11l-1.242 4.14H6a.75.75 0 0 1 .75.75v2c0 .69.56 1.25 1.25 1.25h3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-.75H8A2.75 2.75 0 0 1 5.25 18v-1.25H3.5a.75.75 0 0 1-.718-.966l1.469-4.897a8.75 8.75 0 0 1 7.21-8.502.75.75 0 0 1 .869.607m8.333 5.583a.75.75 0 0 1 .891.576A8.8 8.8 0 0 1 21.75 11a8.72 8.72 0 0 1-2 5.568V21.5a.75.75 0 0 1-1.5 0v-5.492l.188-.213A7.22 7.22 0 0 0 20.25 11a7.3 7.3 0 0 0-.162-1.534.75.75 0 0 1 .575-.89M15.25 2.75a3 3 0 0 0-2.959 2.5h-.041a2 2 0 1 0 0 4h5.5a2.5 2.5 0 0 0 .1-4.998 3 3 0 0 0-2.6-1.502m-1.5 3a1.5 1.5 0 0 1 2.915-.5c.106.3.39.5.707.5h.378a1 1 0 1 1 0 2h-5.5a.5.5 0 0 1 0-1H13a.75.75 0 0 0 .75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHeadCloud;
