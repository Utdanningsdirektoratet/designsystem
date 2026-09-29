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
const SvgFaceLaughFill = forwardRef<
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
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m0 15.17c2.341 0 4.236-1.608 4.475-3.92h-8.95c.24 2.312 2.134 3.92 4.475 3.92M9.534 9.674a1.25 1.25 0 0 0-1.708.458.75.75 0 0 1-1.299-.75 2.75 2.75 0 0 1 3.757-1.007.75.75 0 0 1-.75 1.299m6.64.458a1.25 1.25 0 0 0-1.708-.458.75.75 0 1 1-.75-1.299 2.75 2.75 0 0 1 3.757 1.007.75.75 0 0 1-1.3.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFaceLaughFill;
