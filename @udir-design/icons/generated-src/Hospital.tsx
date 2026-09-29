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
const SvgHospital = forwardRef<
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
          d="M4.25 3A.75.75 0 0 1 5 2.25h14a.75.75 0 0 1 .75.75v18a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75zm12 14a.75.75 0 0 0-.75-.75H12a.75.75 0 0 0-.75.75v3.25h-5.5V3.75h12.5v16.5h-2zm-3.5.75v2.5h2v-2.5zm0-11.75a.75.75 0 0 0-1.5 0v1.25H10a.75.75 0 0 0 0 1.5h1.25V10a.75.75 0 0 0 1.5 0V8.75H14a.75.75 0 0 0 0-1.5h-1.25zm-3.5 7a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0zm0 4a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0zM12 12.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75m4.25.75a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHospital;
