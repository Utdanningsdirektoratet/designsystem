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
const SvgTableInsertColumnRightFill = forwardRef<
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
          d="M8.25 15.5a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25H6A2.75 2.75 0 0 1 3.25 18v-2.25a.25.25 0 0 1 .25-.25zm6.75 0a.25.25 0 0 1 .25.25V20a.75.75 0 0 1-.75.75h-4.25a.25.25 0 0 1-.25-.25v-4.75a.25.25 0 0 1 .25-.25zm4.25-6.25A.75.75 0 0 1 20 10v1.25h1.25a.75.75 0 0 1 0 1.5H20V14a.75.75 0 0 1-1.5 0v-1.25h-1.25a.75.75 0 0 1 0-1.5h1.25V10a.75.75 0 0 1 .75-.75m-11 .75a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25H3.5a.25.25 0 0 1-.25-.25v-3.5A.25.25 0 0 1 3.5 10zM15 10a.25.25 0 0 1 .25.25v3.5A.25.25 0 0 1 15 14h-4.75a.25.25 0 0 1-.25-.25v-3.5a.25.25 0 0 1 .25-.25zM8.25 3.25a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25H3.5a.25.25 0 0 1-.25-.25V6A2.75 2.75 0 0 1 6 3.25zm6.25 0a.75.75 0 0 1 .75.75v4.25a.25.25 0 0 1-.25.25h-4.75a.25.25 0 0 1-.25-.25V3.5a.25.25 0 0 1 .25-.25z"
        />
      </svg>
    );
  },
);
export default SvgTableInsertColumnRightFill;
