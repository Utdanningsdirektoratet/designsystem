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
const SvgTableInsertColumnRight = forwardRef<
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
          d="M14.5 3.25a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zM4.75 18c0 .69.56 1.25 1.25 1.25h2.5V15.5H4.75zM10 19.25h3.75V15.5H10zm9.25-10A.75.75 0 0 1 20 10v1.25h1.25a.75.75 0 0 1 0 1.5H20V14a.75.75 0 0 1-1.5 0v-1.25h-1.25a.75.75 0 0 1 0-1.5h1.25V10a.75.75 0 0 1 .75-.75M4.75 14H8.5v-4H4.75zM10 14h3.75v-4H10zM6 4.75c-.69 0-1.25.56-1.25 1.25v2.5H8.5V4.75zm4 3.75h3.75V4.75H10z"
        />
      </svg>
    );
  },
);
export default SvgTableInsertColumnRight;
