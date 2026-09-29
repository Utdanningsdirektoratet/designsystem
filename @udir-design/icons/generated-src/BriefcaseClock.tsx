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
const SvgBriefcaseClock = forwardRef<
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
          d="M7.75 5c0-.966.784-1.75 1.75-1.75h5c.966 0 1.75.784 1.75 1.75v1.25H21a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V7.75H3.75v4.5H7.5a.75.75 0 0 1 0 1.5H5.25v4.5H8.5a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75v-5.25H3a.75.75 0 0 1-.75-.75V7A.75.75 0 0 1 3 6.25h4.75zm7 0v1.25h-5.5V5a.25.25 0 0 1 .25-.25h5a.25.25 0 0 1 .25.25m.25 5.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5M9.25 15a5.75 5.75 0 1 1 11.5 0 5.75 5.75 0 0 1-11.5 0m6.5-2.5a.75.75 0 0 0-1.5 0V15c0 .199.079.39.22.53l1 1a.75.75 0 1 0 1.06-1.06l-.78-.78z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBriefcaseClock;
