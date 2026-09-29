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
const SvgMonitorTriangleFill = forwardRef<
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
          d="M16.656 2.136a.75.75 0 0 0-1.312 0l-5 9A.75.75 0 0 0 11 12.25h10a.75.75 0 0 0 .656-1.114zm5.094 11.839c0-.173-.172-.294-.341-.262q-.2.037-.409.037H11a2.25 2.25 0 0 1-1.967-3.343l3.77-6.786a.25.25 0 0 0-.219-.371H3.5c-.69 0-1.25.56-1.25 1.25v11c0 .69.56 1.25 1.25 1.25h7.75v2.5H6a.75.75 0 0 0 0 1.5h13a.75.75 0 0 0 0-1.5h-6.25v-2.5h7.75c.69 0 1.25-.56 1.25-1.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMonitorTriangleFill;
