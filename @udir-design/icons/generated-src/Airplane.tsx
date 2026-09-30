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
const SvgAirplane = forwardRef<
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
          d="M6.388 3.625a.75.75 0 0 0-.412 1.145l2.392 3.489-.255.073-2.318-1.643a.75.75 0 0 0-.64-.11l-1.923.552a.75.75 0 0 0-.33 1.244l3.07 3.147a5.75 5.75 0 0 0 5.7 1.51l8.665-2.484c.99-.284 1.231-1.576.41-2.198l-1.594-1.207a4.75 4.75 0 0 0-4.177-.779l-1.547.444-4.44-3.596a.75.75 0 0 0-.678-.138zM8.18 9.873l1.082-.31.29.423a.75.75 0 0 0 1.238-.848L7.802 4.78l.547-.157 4.44 3.596a.75.75 0 0 0 .678.138l1.922-.551a3.25 3.25 0 0 1 2.858.533l1.196.905-8.184 2.347a4.25 4.25 0 0 1-4.213-1.117L4.853 8.226l.369-.105 2.317 1.643a.75.75 0 0 0 .641.11m1.63 7.566-.096-.104c.759-.67 2.107-1.585 3.786-1.585 3.086 0 4.75 2.164 4.75 4.25a.75.75 0 0 0 1.5 0c0-2.914-2.336-5.75-6.25-5.75-2.452 0-4.275 1.458-5.083 2.242A4.1 4.1 0 0 0 7 16.25c-1.204 0-2.161.459-2.81 1.19-.638.716-.94 1.65-.94 2.56a.75.75 0 0 0 1.5 0c0-.59.198-1.156.56-1.564.351-.395.894-.686 1.69-.686s1.339.291 1.69.686c.362.408.56.974.56 1.564a.75.75 0 0 0 1.5 0c0-.91-.302-1.844-.94-2.56"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAirplane;
