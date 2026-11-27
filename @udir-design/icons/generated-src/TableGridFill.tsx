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
const SvgTableGridFill = forwardRef<
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
          d="M8 15.75a.25.25 0 0 1 .25.25v4.5a.25.25 0 0 1-.25.25H6A2.75 2.75 0 0 1 3.25 18v-2a.25.25 0 0 1 .25-.25zm6 0a.25.25 0 0 1 .25.25v4.5a.25.25 0 0 1-.25.25h-4a.25.25 0 0 1-.25-.25V16a.25.25 0 0 1 .25-.25zM20.75 18A2.75 2.75 0 0 1 18 20.75h-2a.25.25 0 0 1-.25-.25V16a.25.25 0 0 1 .25-.25h4.5a.25.25 0 0 1 .25.25zm0-4a.25.25 0 0 1-.25.25H16a.25.25 0 0 1-.25-.25v-4a.25.25 0 0 1 .25-.25h4.5a.25.25 0 0 1 .25.25zM8 9.75a.25.25 0 0 1 .25.25v4a.25.25 0 0 1-.25.25H3.5a.25.25 0 0 1-.25-.25v-4a.25.25 0 0 1 .25-.25zm6 0a.25.25 0 0 1 .25.25v4a.25.25 0 0 1-.25.25h-4a.25.25 0 0 1-.25-.25v-4a.25.25 0 0 1 .25-.25zm4-6.5A2.75 2.75 0 0 1 20.75 6v2a.25.25 0 0 1-.25.25H16a.25.25 0 0 1-.25-.25V3.5a.25.25 0 0 1 .25-.25zM8.25 8a.25.25 0 0 1-.25.25H3.5A.25.25 0 0 1 3.25 8V6A2.75 2.75 0 0 1 6 3.25h2a.25.25 0 0 1 .25.25zm6 0a.25.25 0 0 1-.25.25h-4A.25.25 0 0 1 9.75 8V3.5a.25.25 0 0 1 .25-.25h4a.25.25 0 0 1 .25.25z"
        />
      </svg>
    );
  },
);
export default SvgTableGridFill;
