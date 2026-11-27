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
const SvgKeyboardFill = forwardRef<
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
          d="M20 5.25c.966 0 1.75.784 1.75 1.75v10A1.75 1.75 0 0 1 20 18.75H4A1.75 1.75 0 0 1 2.25 17V7c0-.966.784-1.75 1.75-1.75zM7.5 14a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5zm0-3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5M6 8a.75.75 0 1 0 0 1.5A.75.75 0 0 0 6 8m3 0a.75.75 0 1 0 0 1.5A.75.75 0 0 0 9 8m3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m3 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5"
        />
      </svg>
    );
  },
);
export default SvgKeyboardFill;
