import React, {
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
const SvgBandageFill = forwardRef<
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
          d="M8.752 2.65c.337-.056.884-.075 1.279.32l1.792 1.792a.25.25 0 0 1 0 .353l-6.707 6.707a.25.25 0 0 1-.354 0L2.97 10.03c-.395-.395-.375-.941-.319-1.278.064-.384.223-.802.429-1.213.413-.827 1.088-1.767 1.89-2.57s1.742-1.476 2.57-1.89c.41-.205.829-.364 1.212-.428M6.176 12.884a.25.25 0 0 0 0 .354l4.586 4.585a.25.25 0 0 0 .354 0l6.707-6.707a.25.25 0 0 0 0-.353l-4.586-4.586a.25.25 0 0 0-.354 0zm6 6.354a.25.25 0 0 1 0-.354l6.708-6.707a.25.25 0 0 1 .353 0l1.794 1.793c.395.396.375.942.319 1.28-.064.382-.224.8-.429 1.211-.414.828-1.088 1.768-1.89 2.57s-1.742 1.477-2.57 1.89c-.41.206-.83.365-1.212.429-.338.056-.884.076-1.279-.319zM11.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75m.75 3.25a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zM9.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H10a.75.75 0 0 1-.75-.75m4.75-.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBandageFill;
