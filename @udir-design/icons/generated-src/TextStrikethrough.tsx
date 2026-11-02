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
const SvgTextStrikethrough = forwardRef<
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
          d="M19 11.25a.75.75 0 0 1 0 1.5h-4.006a4.455 4.455 0 0 1-2.702 8h-.309a4.77 4.77 0 0 1-4.718-4.093l-.007-.05a.75.75 0 0 1 1.484-.213l.008.051a3.266 3.266 0 0 0 3.233 2.805h.309a2.958 2.958 0 0 0 1.322-5.604l-1.79-.896H5a.75.75 0 0 1 0-1.5zm-6.983-8a4.77 4.77 0 0 1 4.718 4.093l.007.05a.75.75 0 0 1-1.484.213l-.008-.051a3.266 3.266 0 0 0-3.233-2.805h-.309A2.958 2.958 0 0 0 9.21 9.291c.117.186-.006.459-.226.459H7.9a.24.24 0 0 1-.22-.137 4.458 4.458 0 0 1 4.028-6.363z"
        />
      </svg>
    );
  },
);
export default SvgTextStrikethrough;
