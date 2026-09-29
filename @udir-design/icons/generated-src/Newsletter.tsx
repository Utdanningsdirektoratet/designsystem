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
const SvgNewsletter = forwardRef<
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
          d="M18.25 3a.75.75 0 0 1 .75.75v3.438l2.03 1.725c.14.14.22.332.22.53l-.049 10.803a.75.75 0 0 1-.75.75L3.5 20.982a.75.75 0 0 1-.75-.75V9.431c0-.2.08-.39.22-.53L5 7.187V3.75A.75.75 0 0 1 5.75 3zM5.38 19.55h13.24l-4.965-5.301h-3.31zm9.74-5.897 4.63 4.69-.049-7.4zM4.3 18.233l4.58-4.58-4.629-2.821zM6.5 10.43l3.727 2.318h3.546l3.727-2.318V4.5h-11zM13 9a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 9 9zm2-3a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 9 6z"
        />
      </svg>
    );
  },
);
export default SvgNewsletter;
