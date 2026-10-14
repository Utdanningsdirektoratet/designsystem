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
const SvgLink = forwardRef<
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
          d="M14.909 5.152a2.25 2.25 0 0 1 3.182 0l.757.757a2.25 2.25 0 0 1 0 3.182l-4.964 4.965a1.25 1.25 0 0 1-1.768 0L11.03 12.97a.75.75 0 1 0-1.06 1.06l1.085 1.086a2.75 2.75 0 0 0 3.89 0l4.964-4.964a3.75 3.75 0 0 0 0-5.304l-.757-.757-.53.53.53-.53a3.75 3.75 0 0 0-5.304 0l-.878.879a.75.75 0 0 0 1.06 1.06zm-1.964 3.732a2.75 2.75 0 0 0-3.89 0l-4.964 4.964a3.75 3.75 0 0 0 0 5.304l.513-.514-.513.514.757.757a3.75 3.75 0 0 0 5.304 0l.878-.879a.75.75 0 0 0-1.06-1.06l-.879.878a2.25 2.25 0 0 1-3.182 0l-.757-.757a2.25 2.25 0 0 1 0-3.182l4.964-4.965a1.25 1.25 0 0 1 1.768 0l1.086 1.086a.75.75 0 0 0 1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLink;
