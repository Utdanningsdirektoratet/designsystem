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
const SvgArrowsCirclepath = forwardRef<
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
          d="M3 11.25a.75.75 0 0 1 .75.75 8.25 8.25 0 0 0 14.996 4.75H16a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.583A9.74 9.74 0 0 1 12 21.75c-5.385 0-9.75-4.365-9.75-9.75a.75.75 0 0 1 .75-.75m9-9c5.385 0 9.75 4.365 9.75 9.75a.75.75 0 0 1-1.5 0A8.25 8.25 0 0 0 5.254 7.25H8a.75.75 0 0 1 0 1.5H3.5A.75.75 0 0 1 2.75 8V3.5a.75.75 0 0 1 1.5 0v2.583A9.74 9.74 0 0 1 12 2.25"
        />
      </svg>
    );
  },
);
export default SvgArrowsCirclepath;
