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
const SvgBackpack = forwardRef<
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
          d="M9.25 5.521c-2.32.74-4 2.914-4 5.479v1.25H5A2.75 2.75 0 0 0 2.25 15v3c0 .966.784 1.75 1.75 1.75h1.25V20c0 .966.784 1.75 1.75 1.75h10A1.75 1.75 0 0 0 18.75 20v-.25H20A1.75 1.75 0 0 0 21.75 18v-3A2.75 2.75 0 0 0 19 12.25h-.25V11a5.75 5.75 0 0 0-4-5.479V4.5A1.75 1.75 0 0 0 13 2.75h-2A1.75 1.75 0 0 0 9.25 4.5zM11 4.25a.25.25 0 0 0-.25.25v.755q.124-.005.25-.005h2q.126 0 .25.005V4.5a.25.25 0 0 0-.25-.25zM6.75 11A4.25 4.25 0 0 1 11 6.75h2A4.25 4.25 0 0 1 17.25 11v9a.25.25 0 0 1-.25.25H7a.25.25 0 0 1-.25-.25zM4 18.25a.25.25 0 0 1-.25-.25v-3c0-.69.56-1.25 1.25-1.25h.25v4.5zm15-4.5c.69 0 1.25.56 1.25 1.25v3a.25.25 0 0 1-.25.25h-1.25v-4.5zM9.25 10a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m-1 5c0-.966.784-1.75 1.75-1.75h4c.966 0 1.75.784 1.75 1.75v2A1.75 1.75 0 0 1 14 18.75h-4A1.75 1.75 0 0 1 8.25 17zm1.75-.25a.25.25 0 0 0-.25.25v2c0 .138.112.25.25.25h4a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.25-.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBackpack;
