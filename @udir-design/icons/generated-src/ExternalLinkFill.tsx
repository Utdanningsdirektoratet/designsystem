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
const SvgExternalLinkFill = forwardRef<
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
          d="m18.19 4.75-8.72 8.72a.75.75 0 1 0 1.06 1.06l8.72-8.72v5.69a.75.75 0 0 0 1.5 0V4a.747.747 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5zM8.408 15.591a2.25 2.25 0 0 0 3.182 0l4.305-4.305a.5.5 0 0 1 .854.353V19A1.75 1.75 0 0 1 15 20.75H5A1.75 1.75 0 0 1 3.25 19V9c0-.966.784-1.75 1.75-1.75h7.361a.5.5 0 0 1 .354.854l-4.306 4.305a2.25 2.25 0 0 0 0 3.182"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgExternalLinkFill;
