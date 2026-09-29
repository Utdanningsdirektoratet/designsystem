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
const SvgClipboardLink = forwardRef<
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
          d="M8.25 3A.75.75 0 0 1 9 2.25h6a.75.75 0 0 1 .75.75v1.25H18a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V5A.75.75 0 0 1 6 4.25h2.25zm7.5 3a.75.75 0 0 1-.75.75H9A.75.75 0 0 1 8.25 6v-.25h-1.5v14.5h10.5V5.75h-1.5zm-1.5-.75h-4.5v-1.5h4.5zm-.482 5.422-.177.176a.75.75 0 0 1-1.06-1.06l.353-.354a1.25 1.25 0 0 1 1.768 0l1.414 1.414a1.25 1.25 0 0 1 0 1.768l-2.829 2.829a1.25 1.25 0 0 1-1.767 0l-.354-.354a.75.75 0 0 1 1.06-1.06l.178.176 2.474-2.475zm-2.124 2.127.191.182a.75.75 0 1 0 1.037-1.084l-.368-.351a1.25 1.25 0 0 0-1.747.019l-2.822 2.819a1.25 1.25 0 0 0 0 1.768l1.413 1.414a1.25 1.25 0 0 0 1.768 0l.354-.354a.75.75 0 0 0-1.061-1.06l-.177.176-1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgClipboardLink;
