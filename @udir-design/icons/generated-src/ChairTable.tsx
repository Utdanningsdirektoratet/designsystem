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
const SvgChairTable = forwardRef<
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
          d="M21 6.25a.75.75 0 0 1 0 1.5h-4.577l2.311 11.097a.75.75 0 0 1-1.468.306L15.5 10.68l-1.766 8.474a.75.75 0 0 1-1.468-.306L14.577 7.75H10a.75.75 0 0 1 0-1.5zm-18-2a.75.75 0 0 1 .75.75v6c0 .69.56 1.25 1.25 1.25h5a.75.75 0 1 1 0 1.5H8.96l1.267 5.068a.75.75 0 0 1-1.455.364L7.415 13.75h-2.33l-1.357 5.432a.75.75 0 0 1-1.456-.364l1.359-5.436A2.75 2.75 0 0 1 2.25 11V5A.75.75 0 0 1 3 4.25"
        />
      </svg>
    );
  },
);
export default SvgChairTable;
