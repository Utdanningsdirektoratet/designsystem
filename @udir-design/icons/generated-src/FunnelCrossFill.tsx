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
const SvgFunnelCrossFill = forwardRef<
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
          d="M17 12.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5m4-9a.75.75 0 0 1 .592 1.21l-4.827 6.206a.26.26 0 0 1-.186.098 6.25 6.25 0 0 0-4.71 9.804.26.26 0 0 1-.091.381l-1.443.722A.75.75 0 0 1 9.25 21v-7.656a.25.25 0 0 0-.053-.154L2.408 4.46A.75.75 0 0 1 3 3.25zm-2.055 11.806a.75.75 0 0 0-1.061 0L17 15.94l-.884-.884a.75.75 0 1 0-1.06 1.06l.884.884-.884.884a.75.75 0 1 0 1.06 1.06l.884-.883.884.883a.75.75 0 1 0 1.06-1.06L18.062 17l.884-.884a.75.75 0 0 0 0-1.06"
        />
      </svg>
    );
  },
);
export default SvgFunnelCrossFill;
