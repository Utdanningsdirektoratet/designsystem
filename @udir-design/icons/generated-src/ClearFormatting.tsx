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
const SvgClearFormatting = forwardRef<
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
          d="M17 12.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5m1.944 2.806a.75.75 0 0 0-1.06 0L17 15.94l-.884-.884a.75.75 0 1 0-1.06 1.06l.884.884-.884.884a.75.75 0 1 0 1.06 1.06l.884-.883.884.883a.75.75 0 1 0 1.06-1.06L18.061 17l.883-.884a.75.75 0 0 0 0-1.06M10.5 16.25a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1 0-1.5zm6-13a.75.75 0 0 1 .67 1.085l-.5 1a.75.75 0 0 1-.67.415h-.5a.75.75 0 0 1-.706-1h-2.277l-3.428 9H10a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5h1.483l3.428-9H8.464l-.293.585a.75.75 0 0 1-.671.415H7a.75.75 0 0 1-.67-1.085l.5-1 .053-.09A.75.75 0 0 1 7.5 3.25z"
        />
      </svg>
    );
  },
);
export default SvgClearFormatting;
