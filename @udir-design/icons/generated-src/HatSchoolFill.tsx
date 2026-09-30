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
const SvgHatSchoolFill = forwardRef<
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
          d="M11.695 4.315a.75.75 0 0 1 .61 0l8.984 3.993A.75.75 0 0 1 21.75 9v7a.75.75 0 0 1-1.5 0v-5.846l-7.945 3.531a.75.75 0 0 1-.61 0l-9-4a.75.75 0 0 1 0-1.37zm-6.445 8.39a.25.25 0 0 1 .352-.228l6.093 2.708a.75.75 0 0 0 .61 0l6.093-2.708a.25.25 0 0 1 .352.228V16a.75.75 0 0 1-.415.67l-.186.094a13.75 13.75 0 0 1-12.298 0l-.186-.093A.75.75 0 0 1 5.25 16z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHatSchoolFill;
