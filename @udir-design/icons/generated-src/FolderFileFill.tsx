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
const SvgFolderFileFill = forwardRef<
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
          d="M6.25 3.5c0-.69.56-1.25 1.25-1.25h9c.69 0 1.25.56 1.25 1.25v7a.25.25 0 0 1-.25.25h-3.028a.265.265 0 0 1-.257-.23A3.25 3.25 0 0 0 11 7.75H6.5a.25.25 0 0 1-.25-.25zM10 4.75a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5zm-4 4.5A1.75 1.75 0 0 0 4.25 11v9.5c0 .69.56 1.25 1.25 1.25h13c.69 0 1.25-.56 1.25-1.25v-7c0-.69-.56-1.25-1.25-1.25h-5.75V11A1.75 1.75 0 0 0 11 9.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFolderFileFill;
