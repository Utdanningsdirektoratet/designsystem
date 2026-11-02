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
const SvgTableGrid = forwardRef<
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
          d="M18 3.25A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zM4.75 18c0 .69.56 1.25 1.25 1.25h2.5V15.5H4.75zm10.75 1.25H18c.69 0 1.25-.56 1.25-1.25v-2.5H15.5zm-5.5 0h4V15.5h-4zM4.75 14H8.5v-4H4.75zm10.75 0h3.75v-4H15.5zM10 14h4v-4h-4zM6 4.75c-.69 0-1.25.56-1.25 1.25v2.5H8.5V4.75zm9.5 3.75h3.75V6c0-.69-.56-1.25-1.25-1.25h-2.5zm-5.5 0h4V4.75h-4z"
        />
      </svg>
    );
  },
);
export default SvgTableGrid;
