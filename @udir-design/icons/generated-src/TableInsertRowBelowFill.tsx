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
const SvgTableInsertRowBelowFill = forwardRef<
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
          d="M12 16.5a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25v1.25a.75.75 0 0 1-1.5 0V20H10a.75.75 0 0 1 0-1.5h1.25v-1.25a.75.75 0 0 1 .75-.75M8.25 10a.25.25 0 0 1 .25.25V15a.25.25 0 0 1-.25.25H4a.75.75 0 0 1-.75-.75v-4.25A.25.25 0 0 1 3.5 10zm5.5 0a.25.25 0 0 1 .25.25V15a.25.25 0 0 1-.25.25h-3.5A.25.25 0 0 1 10 15v-4.75a.25.25 0 0 1 .25-.25zm6.75 0a.25.25 0 0 1 .25.25v4.25a.75.75 0 0 1-.75.75h-4.25a.25.25 0 0 1-.25-.25v-4.75a.25.25 0 0 1 .25-.25zM8.25 3.25a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25H3.5a.25.25 0 0 1-.25-.25V6A2.75 2.75 0 0 1 6 3.25zm5.5 0a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25V3.5a.25.25 0 0 1 .25-.25zm4.25 0A2.75 2.75 0 0 1 20.75 6v2.25a.25.25 0 0 1-.25.25h-4.75a.25.25 0 0 1-.25-.25V3.5a.25.25 0 0 1 .25-.25z"
        />
      </svg>
    );
  },
);
export default SvgTableInsertRowBelowFill;
