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
const SvgSlideFill = forwardRef<
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
          d="M20 3.75c.966 0 1.75.784 1.75 1.75v14a.75.75 0 0 1-1.5 0v-1.25h-3.5v1.25a.75.75 0 0 1-1.5 0v-1.67a20 20 0 0 0 1.5-1.78v.7h3.5v-2h-2.606q.462-.73.86-1.5h1.746v-2h-.846q.17-.435.318-.88l.206-.62h.322v-2h-.709l-.768 2.303a19.1 19.1 0 0 1-7.87 10.08 1 1 0 0 1-.1.052l-.022.01q-.033.01-.067.02-.042.013-.085.022l-.012.002a1 1 0 0 1-.117.011h-8l-.005-.001h-.009a.8.8 0 0 1-.276-.058.75.75 0 0 1-.37-.336l-.031-.063-.004-.01a.75.75 0 0 1-.055-.281.75.75 0 0 1 .438-.683l.028-.012a19.34 19.34 0 0 0 10.98-11.764l.054-.165V5.5a1.75 1.75 0 1 1 3.5 0v.75h1.5V5.5c0-.966.784-1.75 1.75-1.75m-5 1.5a.25.25 0 0 0-.25.25v.75h.5V5.5a.25.25 0 0 0-.25-.25m5 0a.25.25 0 0 0-.25.25v.75h.5V5.5a.25.25 0 0 0-.25-.25"
        />
      </svg>
    );
  },
);
export default SvgSlideFill;
