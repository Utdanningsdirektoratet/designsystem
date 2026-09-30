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
const SvgMeetingLargeFill = forwardRef<
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
          d="M6 4.75a1.25 1.25 0 0 0-1.21.937.75.75 0 0 1-1.453-.374 2.75 2.75 0 0 1 5.326 0 .75.75 0 1 1-1.452.374A1.25 1.25 0 0 0 6 4.75M2.25 8A.75.75 0 0 1 3 7.25h18a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75zm8.54-2.313a1.25 1.25 0 0 1 2.42 0 .75.75 0 0 0 1.454-.374 2.75 2.75 0 0 0-5.327 0 .75.75 0 0 0 1.453.374M18 4.75a1.25 1.25 0 0 0-1.21.937.75.75 0 1 1-1.453-.374 2.75 2.75 0 0 1 5.326 0 .75.75 0 0 1-1.452.374A1.25 1.25 0 0 0 18 4.75M4.79 18.313a.75.75 0 0 0-1.453.374 2.75 2.75 0 0 0 5.326 0 .75.75 0 1 0-1.452-.374 1.25 1.25 0 0 1-2.421 0m5.086-.54a.75.75 0 0 1 .914.54 1.25 1.25 0 0 0 2.42 0 .75.75 0 0 1 1.454.374 2.75 2.75 0 0 1-5.327 0 .75.75 0 0 1 .54-.913m6.914.54a.75.75 0 0 0-1.453.374 2.75 2.75 0 0 0 5.326 0 .75.75 0 0 0-1.452-.374 1.25 1.25 0 0 1-2.421 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMeetingLargeFill;
