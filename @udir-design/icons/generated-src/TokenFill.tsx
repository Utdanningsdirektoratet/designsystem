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
const SvgTokenFill = forwardRef<
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
          d="M12.375 2.35a.75.75 0 0 0-.75 0l-7.07 4.082a.234.234 0 0 0 .007.408l.018.01 4.436 2.561c.103.06.233.038.316-.047A3.74 3.74 0 0 1 12 8.25c1.043 0 1.988.426 2.667 1.114a.26.26 0 0 0 .316.047l4.252-2.454.017-.01.167-.09a.25.25 0 0 0 .005-.436zm8.169 6.023a.25.25 0 0 0-.369-.22l-.2.108-4.24 2.449a.26.26 0 0 0-.118.297 3.755 3.755 0 0 1-2.668 4.622.26.26 0 0 0-.2.25V21a.25.25 0 0 0 .376.216l7.044-4.067a.75.75 0 0 0 .375-.649zm-9.67 12.844A.25.25 0 0 0 11.25 21v-5.12a.26.26 0 0 0-.2-.251 3.75 3.75 0 0 1-2.667-4.622.26.26 0 0 0-.118-.297L3.84 8.155l-.016-.008a.25.25 0 0 0-.368.22V16.5a.75.75 0 0 0 .375.65zm3.062-10.364a2.25 2.25 0 0 0-3.877.009l-.008.013-.008.014a2.25 2.25 0 1 0 3.919.008l-.014-.022z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTokenFill;
