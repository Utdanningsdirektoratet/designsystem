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
const SvgTableCellsMerge = forwardRef<
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
          d="M18 3.25A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zm-5.25 16H18c.69 0 1.25-.56 1.25-1.25v-.75h-6.5zm-8-1.25c0 .69.56 1.25 1.25 1.25h5.25v-2h-6.5zm0-2.25h14.5v-7.5H4.75zm9.72-6.28a.75.75 0 0 1 1.06 0l2 2a.8.8 0 0 1 .118.16q.025.04.044.083a.75.75 0 0 1-.078.715 1 1 0 0 1-.084.102l-2 2a.75.75 0 0 1-1.06-1.06l.72-.72H8.81l.72.72a.75.75 0 0 1-1.06 1.06l-2-2a.75.75 0 0 1-.208-.663.8.8 0 0 1 .043-.15l.004-.009q.018-.04.042-.078a.8.8 0 0 1 .119-.16l2-2a.75.75 0 1 1 1.06 1.06l-.72.72h6.38l-.72-.72a.75.75 0 0 1 0-1.06M6 4.75c-.69 0-1.25.56-1.25 1.25v.75h6.5v-2zm6.75 2h6.5V6c0-.69-.56-1.25-1.25-1.25h-5.25z"
        />
      </svg>
    );
  },
);
export default SvgTableCellsMerge;
