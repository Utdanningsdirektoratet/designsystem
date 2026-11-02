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
const SvgMenuHamburgerMagnifyingGlass = forwardRef<
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
          d="M14.5 3.25a6.25 6.25 0 0 1 3.574 11.375l2.593 5.031a.75.75 0 0 1-1.334.688l-2.582-5.014A6.25 6.25 0 1 1 14.5 3.25m1.4 14c.093 0 .18.053.222.136l.516 1a.25.25 0 0 1-.223.364H3.5a.75.75 0 0 1 0-1.5zm-1.4-12.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5m-7.748 6.5c.116 0 .217.08.246.193q.126.487.312.948a.26.26 0 0 1-.237.359H3.5a.75.75 0 0 1 0-1.5zm.805-6c.199 0 .32.222.22.395a8 8 0 0 0-.46.945.26.26 0 0 1-.236.16H3.5a.75.75 0 0 1 0-1.5z"
        />
      </svg>
    );
  },
);
export default SvgMenuHamburgerMagnifyingGlass;
