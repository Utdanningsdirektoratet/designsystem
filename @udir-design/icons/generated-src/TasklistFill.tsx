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
const SvgTasklistFill = forwardRef<
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
          fillRule="evenodd"
          d="M4.25 3.5c0-.69.56-1.25 1.25-1.25h13c.69 0 1.25.56 1.25 1.25v17c0 .69-.56 1.25-1.25 1.25h-13c-.69 0-1.25-.56-1.25-1.25zm7 12.5a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75m.75-4.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 15.25a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zM12.25 8a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H13a.75.75 0 0 1-.75-.75m-1.15-.8a.75.75 0 1 0-1.2-.9l-.981 1.308-.389-.388a.75.75 0 0 0-1.06 1.06l1 1A.75.75 0 0 0 9.6 9.2z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTasklistFill;
