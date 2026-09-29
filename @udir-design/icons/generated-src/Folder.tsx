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
const SvgFolder = forwardRef<
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
          d="M4 5.75a.25.25 0 0 0-.25.25v12.25h16.5v-9.5H11a.75.75 0 0 1-.75-.75V6a.25.25 0 0 0-.25-.25zM2.25 6c0-.966.784-1.75 1.75-1.75h6c.966 0 1.75.784 1.75 1.75v1.25h8.75c.69 0 1.25.56 1.25 1.25v10c0 .69-.56 1.25-1.25 1.25h-17c-.69 0-1.25-.56-1.25-1.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFolder;
