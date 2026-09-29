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
const SvgBedFill = forwardRef<
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
          d="M4.25 7c0-.966.784-1.75 1.75-1.75h12c.966 0 1.75.784 1.75 1.75v3a.25.25 0 0 1-.25.25h-2.25A.25.25 0 0 1 17 10V9a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 11 10V9a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1a.25.25 0 0 1-.25.25H4.5a.25.25 0 0 1-.25-.25zM4 11.25A1.75 1.75 0 0 0 2.25 13v5.5c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75V13A1.75 1.75 0 0 0 20 11.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBedFill;
