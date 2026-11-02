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
const SvgTableDeleteColumn = forwardRef<
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
          d="M8 3.25a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zm10 0A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75h-2a.75.75 0 0 1-.75-.75V4a.75.75 0 0 1 .75-.75zM4.75 18c0 .69.56 1.25 1.25 1.25h1.25V15.5h-2.5zm12 1.25H18c.69 0 1.25-.56 1.25-1.25v-2.5h-2.5zm-3.866-9.28a.75.75 0 1 1 1.06 1.06l-.884.884.884.884a.75.75 0 1 1-1.06 1.06L12 12.975l-.884.883a.75.75 0 1 1-1.06-1.06l.884-.884-.884-.884a.75.75 0 1 1 1.06-1.06l.884.883zM4.75 14h2.5v-4h-2.5zm12 0h2.5v-4h-2.5zM6 4.75c-.69 0-1.25.56-1.25 1.25v2.5h2.5V4.75zM16.75 8.5h2.5V6c0-.69-.56-1.25-1.25-1.25h-1.25z"
        />
      </svg>
    );
  },
);
export default SvgTableDeleteColumn;
