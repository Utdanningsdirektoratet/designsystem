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
const SvgTenancy = forwardRef<
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
          d="M8.25 7a3.75 3.75 0 0 0 2.43 3.51l-3.692 4.923a2.75 2.75 0 1 0 1.2.9l3.062-4.083v3.104a2.751 2.751 0 1 0 1.5 0V12.25l3.063 4.083a2.75 2.75 0 1 0 1.2-.9L13.32 10.51A3.751 3.751 0 0 0 12 3.25 3.75 3.75 0 0 0 8.25 7M12 4.75a2.25 2.25 0 0 0-.008 4.5h.015A2.25 2.25 0 0 0 12 4.75m0 12a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m-6 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5m12 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTenancy;
