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
const SvgEarSoundwaves = forwardRef<
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
          d="M15.677 2.269C11.772 1.668 8.25 4.689 8.25 8.64a.75.75 0 1 0 1.5 0 4.947 4.947 0 1 1 9.693 1.395l-2.196 7.468a3.826 3.826 0 0 1-7.497-1.08.75.75 0 0 0-1.5 0 5.326 5.326 0 0 0 10.436 1.503l2.196-7.467c1.1-3.743-1.349-7.598-5.205-8.191m-.362 3.607a3.417 3.417 0 0 0-4.065 3.355v1.77c0 .413.336.75.75.75a1.25 1.25 0 1 1 0 2.5.75.75 0 0 0 0 1.5 2.75 2.75 0 0 0 .75-5.397V9.23a1.917 1.917 0 1 1 3.767.506l-.291 1.065a.75.75 0 0 0 1.446.396l.292-1.065a3.417 3.417 0 0 0-2.65-4.257m-11.573.16a.75.75 0 0 1 1.053-.125A7.74 7.74 0 0 1 7.75 12a7.74 7.74 0 0 1-2.955 6.089.75.75 0 0 1-.929-1.178A6.24 6.24 0 0 0 6.25 12c0-1.992-.93-3.765-2.384-4.911a.75.75 0 0 1-.124-1.053m-.18 2.822a.75.75 0 0 0-1.124.993c.506.573.812 1.324.812 2.15 0 .824-.306 1.575-.812 2.149a.75.75 0 1 0 1.124.992A4.74 4.74 0 0 0 4.75 12a4.74 4.74 0 0 0-1.188-3.142"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEarSoundwaves;
