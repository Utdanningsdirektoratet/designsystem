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
const SvgTableInsertColumnLeftFill = forwardRef<
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
          d="M13.75 15.5a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25H9.5a.75.75 0 0 1-.75-.75v-4.25A.25.25 0 0 1 9 15.5zm6.75 0a.25.25 0 0 1 .25.25V18A2.75 2.75 0 0 1 18 20.75h-2.25a.25.25 0 0 1-.25-.25v-4.75a.25.25 0 0 1 .25-.25zM4.75 9.25a.75.75 0 0 1 .75.75v1.25h1.25a.75.75 0 0 1 0 1.5H5.5V14A.75.75 0 0 1 4 14v-1.25H2.75a.75.75 0 0 1 0-1.5H4V10a.75.75 0 0 1 .75-.75m9 .75a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25H9a.25.25 0 0 1-.25-.25v-3.5A.25.25 0 0 1 9 10zm6.75 0a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25h-4.75a.25.25 0 0 1-.25-.25v-3.5a.25.25 0 0 1 .25-.25zm-6.75-6.75a.25.25 0 0 1 .25.25v4.75a.25.25 0 0 1-.25.25H9a.25.25 0 0 1-.25-.25V4a.75.75 0 0 1 .75-.75zm4.25 0A2.75 2.75 0 0 1 20.75 6v2.25a.25.25 0 0 1-.25.25h-4.75a.25.25 0 0 1-.25-.25V3.5a.25.25 0 0 1 .25-.25z"
        />
      </svg>
    );
  },
);
export default SvgTableInsertColumnLeftFill;
