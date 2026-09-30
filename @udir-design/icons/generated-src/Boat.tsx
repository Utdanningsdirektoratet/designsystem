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
const SvgBoat = forwardRef<
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
          d="M5.25 3A.75.75 0 0 1 6 2.25h12a.75.75 0 0 1 .75.75v8.068l.973.302a.75.75 0 0 1 .475.99l-3.5 8.914a.75.75 0 0 1-.698.476H8a.75.75 0 0 1-.698-.476l-3.5-8.914a.75.75 0 0 1 .475-.99l.973-.302zm12 7.601-5.027-1.563a.75.75 0 0 0-.446 0L6.75 10.601V3.75h10.5zM5.493 12.563 8.51 20.25h6.978l3.018-7.687L12 10.54zM8.25 6.5A.75.75 0 0 1 9 5.75h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75m4.5 0a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBoat;
