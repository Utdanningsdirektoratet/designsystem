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
const SvgTableDeleteRow = forwardRef<
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
          d="M20 15.25a.75.75 0 0 1 .75.75v2A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18v-2a.75.75 0 0 1 .75-.75zM4.75 18c0 .69.56 1.25 1.25 1.25h2.5v-2.5H4.75zM10 19.25h4v-2.5h-4zm5.5 0H18c.69 0 1.25-.56 1.25-1.25v-1.25H15.5zm-2.702-9.194a.75.75 0 1 1 1.06 1.06l-.883.884.883.884a.75.75 0 1 1-1.06 1.06l-.884-.884-.884.884a.75.75 0 1 1-1.06-1.06l.883-.884-.883-.884a.75.75 0 0 1 1.06-1.06l.884.884zM18 3.25A2.75 2.75 0 0 1 20.75 6v2a.75.75 0 0 1-.75.75H4A.75.75 0 0 1 3.25 8V6A2.75 2.75 0 0 1 6 3.25zM6 4.75c-.69 0-1.25.56-1.25 1.25v1.25H8.5v-2.5zm4 2.5h4v-2.5h-4zm5.5 0h3.75V6c0-.69-.56-1.25-1.25-1.25h-2.5z"
        />
      </svg>
    );
  },
);
export default SvgTableDeleteRow;
