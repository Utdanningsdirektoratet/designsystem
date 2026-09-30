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
const SvgLineGraphStacked = forwardRef<
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
          d="M20.41 7.21a.75.75 0 0 0-.82-1.255l-6.532 4.275-3.006-1.967a.75.75 0 0 0-.822 0l-5.64 3.692a.75.75 0 0 0 .82 1.255l5.23-3.423 3.007 1.967a.75.75 0 0 0 .822 0zm0 4.835a.75.75 0 0 0-.82-1.255l-6.532 4.275-3.006-1.967a.75.75 0 0 0-.822 0L3.59 16.79a.75.75 0 1 0 .82 1.255l5.23-3.424 3.007 1.968a.75.75 0 0 0 .822 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLineGraphStacked;
