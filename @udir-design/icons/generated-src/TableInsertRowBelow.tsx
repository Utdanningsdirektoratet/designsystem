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
const SvgTableInsertRowBelow = forwardRef<
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
          d="M12 16.5a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25v1.25a.75.75 0 0 1-1.5 0V20H10a.75.75 0 0 1 0-1.5h1.25v-1.25a.75.75 0 0 1 .75-.75m6-13.25A2.75 2.75 0 0 1 20.75 6v8.5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75V6A2.75 2.75 0 0 1 6 3.25zM4.75 13.75H8.5V10H4.75zm5.25 0h4V10h-4zm5.5 0h3.75V10H15.5zm-9.5-9c-.69 0-1.25.56-1.25 1.25v2.5H8.5V4.75zm4 3.75h4V4.75h-4zm5.5 0h3.75V6c0-.69-.56-1.25-1.25-1.25h-2.5z"
        />
      </svg>
    );
  },
);
export default SvgTableInsertRowBelow;
