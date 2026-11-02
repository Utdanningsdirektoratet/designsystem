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
const SvgTableInsertRowAboveFill = forwardRef<
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
          d="M8.25 15.5a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25H6A2.75 2.75 0 0 1 3.25 18v-2.25a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25v-4.75a.25.25 0 0 1 .25-.25zm6.75 0a.25.25 0 0 1 .25.25V18A2.75 2.75 0 0 1 18 20.75h-2.25a.25.25 0 0 1-.25-.25v-4.75a.25.25 0 0 1 .25-.25zM8.25 8.75A.25.25 0 0 1 8.5 9v4.75a.25.25 0 0 1-.25.25H3.5a.25.25 0 0 1-.25-.25V9.5A.75.75 0 0 1 4 8.75zm5.5 0A.25.25 0 0 1 14 9v4.75a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25V9a.25.25 0 0 1 .25-.25zm6.25 0a.75.75 0 0 1 .75.75v4.25a.25.25 0 0 1-.25.25h-4.75a.25.25 0 0 1-.25-.25V9a.25.25 0 0 1 .25-.25zM12 2a.75.75 0 0 1 .75.75V4H14a.75.75 0 0 1 0 1.5h-1.25v1.25a.75.75 0 0 1-1.5 0V5.5H10A.75.75 0 0 1 10 4h1.25V2.75A.75.75 0 0 1 12 2"
        />
      </svg>
    );
  },
);
export default SvgTableInsertRowAboveFill;
