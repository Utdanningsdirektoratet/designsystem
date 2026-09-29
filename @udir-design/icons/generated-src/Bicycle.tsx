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
const SvgBicycle = forwardRef<
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
          d="M16.75 6a.75.75 0 0 0-.75-.75h-2a.75.75 0 0 0-.685 1.055l1.329 2.99-2.37 2.371L10.63 9.75H11a.75.75 0 0 0 0-1.5H8a.75.75 0 0 0 0 1.5h.655l2.554 2.98-.579.58-1.173.234a3.751 3.751 0 1 0 .293 1.47l1.397-.279a.75.75 0 0 0 .383-.205l3.767-3.766.525 1.183a3.75 3.75 0 1 0 1.37-.61L15.155 6.75H16a.75.75 0 0 0 .75-.75m-8.817 7.849-2.08.416a.75.75 0 1 0 .294 1.47l2.08-.416a2.25 2.25 0 1 1-.294-1.47M15.75 15c0-.643.27-1.224.703-1.634l.862 1.939a.75.75 0 0 0 1.37-.61l-.861-1.938q.087-.007.176-.007A2.25 2.25 0 1 1 15.75 15"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBicycle;
