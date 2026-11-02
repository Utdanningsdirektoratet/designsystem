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
const SvgTableDeleteRowFill = forwardRef<
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
          d="M8.5 20.75H6A2.75 2.75 0 0 1 3.25 18v-2a.75.75 0 0 1 .75-.75h4.5zm5.5 0h-4v-5.5h4zm6-5.5a.75.75 0 0 1 .75.75v2A2.75 2.75 0 0 1 18 20.75h-2.5v-5.5zm-7.202-5.194a.75.75 0 1 1 1.06 1.06l-.883.884.883.884a.75.75 0 1 1-1.06 1.06l-.884-.884-.884.884a.75.75 0 1 1-1.06-1.06l.883-.884-.883-.884a.75.75 0 0 1 1.06-1.06l.884.884zM8.5 8.75H4A.75.75 0 0 1 3.25 8V6A2.75 2.75 0 0 1 6 3.25h2.5zm5.5 0h-4v-5.5h4zm4-5.5A2.75 2.75 0 0 1 20.75 6v2a.75.75 0 0 1-.75.75h-4.5v-5.5z"
        />
      </svg>
    );
  },
);
export default SvgTableDeleteRowFill;
