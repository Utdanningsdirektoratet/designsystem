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
const SvgTableInsertColumnLeft = forwardRef<
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
          d="M18 3.25A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H9.5a.75.75 0 0 1-.75-.75V4a.75.75 0 0 1 .75-.75zm-7.75 16H14V15.5h-3.75zm5.25 0H18c.69 0 1.25-.56 1.25-1.25v-2.5H15.5zm-10.75-10a.75.75 0 0 1 .75.75v1.25h1.25a.75.75 0 0 1 0 1.5H5.5V14A.75.75 0 0 1 4 14v-1.25H2.75a.75.75 0 0 1 0-1.5H4V10a.75.75 0 0 1 .75-.75m5.5 4.75H14v-4h-3.75zm5.25 0h3.75v-4H15.5zm-5.25-5.5H14V4.75h-3.75zm5.25 0h3.75V6c0-.69-.56-1.25-1.25-1.25h-2.5z"
        />
      </svg>
    );
  },
);
export default SvgTableInsertColumnLeft;
