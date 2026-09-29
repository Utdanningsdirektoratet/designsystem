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
const SvgEraser = forwardRef<
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
          d="M15.005 3.338a.75.75 0 0 0-1.06 0l-9.9 9.9a1.75 1.75 0 0 0 0 2.474l4.242 4.243a1.75 1.75 0 0 0 2.475 0l9.9-9.9a.75.75 0 0 0 0-1.06zM7.05 12.354l7.425-7.425 4.596 4.596-7.425 7.425zm-1.06 1.06-.885.884a.25.25 0 0 0 0 .354l4.243 4.242a.25.25 0 0 0 .354 0l.883-.884z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEraser;
