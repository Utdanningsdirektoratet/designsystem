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
const SvgTableCrossFill = forwardRef<
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
          d="M17 12.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5m-9 3.5a.25.25 0 0 1 .25.25v4.5a.25.25 0 0 1-.25.25H6A2.75 2.75 0 0 1 3.25 18v-2a.25.25 0 0 1 .25-.25zm2.57 0a.26.26 0 0 1 .251.3q-.07.465-.071.95a6.2 6.2 0 0 0 .966 3.338c.11.174-.01.412-.216.412H10a.25.25 0 0 1-.25-.25V16a.25.25 0 0 1 .25-.25zm8.374-.694a.75.75 0 0 0-1.06 0L17 15.94l-.884-.884a.75.75 0 1 0-1.06 1.06l.884.884-.884.884a.75.75 0 1 0 1.06 1.06l.884-.883.884.883a.75.75 0 1 0 1.06-1.06L18.061 17l.883-.884a.75.75 0 0 0 0-1.06M8 9.75a.25.25 0 0 1 .25.25v4a.25.25 0 0 1-.25.25H3.5a.25.25 0 0 1-.25-.25v-4a.25.25 0 0 1 .25-.25zm6 0a.25.25 0 0 1 .25.25v1.23a.26.26 0 0 1-.139.226 6.28 6.28 0 0 0-2.654 2.655.26.26 0 0 1-.227.139H10a.25.25 0 0 1-.25-.25v-4a.25.25 0 0 1 .25-.25zm6.5 0a.25.25 0 0 1 .25.25v1.499c0 .206-.238.326-.412.216A6.2 6.2 0 0 0 17 10.75q-.485 0-.95.071a.26.26 0 0 1-.3-.252V10a.25.25 0 0 1 .25-.25zM8 3.25a.25.25 0 0 1 .25.25V8a.25.25 0 0 1-.25.25H3.5A.25.25 0 0 1 3.25 8V6A2.75 2.75 0 0 1 6 3.25zm6 0a.25.25 0 0 1 .25.25V8a.25.25 0 0 1-.25.25h-4A.25.25 0 0 1 9.75 8V3.5a.25.25 0 0 1 .25-.25zm4 0A2.75 2.75 0 0 1 20.75 6v2a.25.25 0 0 1-.25.25H16a.25.25 0 0 1-.25-.25V3.5a.25.25 0 0 1 .25-.25z"
        />
      </svg>
    );
  },
);
export default SvgTableCrossFill;
