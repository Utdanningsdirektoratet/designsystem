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
const SvgTablePlus = forwardRef<
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
          d="M17 12.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5m1-9A2.75 2.75 0 0 1 20.75 6v5.999a6.2 6.2 0 0 0-1.5-.831V10H15.5v.932a6.2 6.2 0 0 0-1.5.584V10h-4v4h1.516c-.256.467-.453.97-.583 1.5H10v3.75h1.169a6.2 6.2 0 0 0 .831 1.5H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zm-1 11a.75.75 0 0 0-.75.75v1.25H15a.75.75 0 0 0 0 1.5h1.25V19a.75.75 0 0 0 1.5 0v-1.25H19a.75.75 0 0 0 0-1.5h-1.25V15a.75.75 0 0 0-.75-.75M4.75 18c0 .69.56 1.25 1.25 1.25h2.5V15.5H4.75zm0-4H8.5v-4H4.75zM6 4.75c-.69 0-1.25.56-1.25 1.25v2.5H8.5V4.75zm4 3.75h4V4.75h-4zm5.5 0h3.75V6c0-.69-.56-1.25-1.25-1.25h-2.5z"
        />
      </svg>
    );
  },
);
export default SvgTablePlus;
