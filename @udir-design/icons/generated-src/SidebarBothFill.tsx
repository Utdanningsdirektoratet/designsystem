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
const SvgSidebarBothFill = forwardRef<
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
          d="M14.25 3.75a.5.5 0 0 0-.5-.5h-3.5a.5.5 0 0 0-.5.5v16.5a.5.5 0 0 0 .5.5h3.5a.5.5 0 0 0 .5-.5zm1.5 16.5a.5.5 0 0 0 .5.5H20a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.75-.75h-3.75a.5.5 0 0 0-.5.5zM4 3.25h3.75a.5.5 0 0 1 .5.5v16.5a.5.5 0 0 1-.5.5H4a.75.75 0 0 1-.75-.75V4A.75.75 0 0 1 4 3.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSidebarBothFill;
