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
const SvgRoadblockFill = forwardRef<
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
          d="M4.75 4a.75.75 0 0 0-1.5 0v16a.75.75 0 0 0 1.5 0v-7.25h14.5V20a.75.75 0 0 0 1.5 0V4a.75.75 0 0 0-1.5 0v1.25H4.75zm2.884 2.75c.2 0 .319.223.208.389l-2.673 4.01a.229.229 0 0 1-.419-.128v-.972a.25.25 0 0 1 .042-.138l2.033-3.05a.25.25 0 0 1 .208-.111zm1.333 4.5a.25.25 0 0 0 .208-.111l2.667-4a.25.25 0 0 0-.208-.389h-.601a.25.25 0 0 0-.208.111l-2.667 4a.25.25 0 0 0 .208.389zm4 0a.25.25 0 0 0 .208-.111l2.667-4a.25.25 0 0 0-.208-.389h-.601a.25.25 0 0 0-.208.111l-2.667 4a.25.25 0 0 0 .208.389zm4 0a.25.25 0 0 0 .208-.111l2.033-3.05a.25.25 0 0 0 .042-.138v-.972a.229.229 0 0 0-.419-.127l-2.673 4.01a.25.25 0 0 0 .208.388z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRoadblockFill;
