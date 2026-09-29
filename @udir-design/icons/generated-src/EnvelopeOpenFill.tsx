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
const SvgEnvelopeOpenFill = forwardRef<
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
          d="M12.364 2.344a.75.75 0 0 0-.728 0L3.37 6.937a.235.235 0 0 0-.003.41l6.913 3.84a.5.5 0 0 0 .243.063h2.955a.5.5 0 0 0 .242-.063l6.917-3.843a.231.231 0 0 0 0-.404zm9.386 6.948a.5.5 0 0 0-.743-.437l-5.266 2.925a.5.5 0 0 0-.11.79l5.265 5.267a.5.5 0 0 0 .854-.354zM19.481 19.75a.5.5 0 0 0 .354-.854l-6-6a.5.5 0 0 0-.354-.146h-2.964a.5.5 0 0 0-.354.146l-6 6a.5.5 0 0 0 .354.854zM2.25 17.481a.5.5 0 0 0 .854.354l5.264-5.265a.5.5 0 0 0-.11-.79L2.627 8.65a.252.252 0 0 0-.377.219z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEnvelopeOpenFill;
