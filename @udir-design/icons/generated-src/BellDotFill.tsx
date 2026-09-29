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
const SvgBellDotFill = forwardRef<
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
          d="M14.5 2.813a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5M9.788 3.981c.2-.047.36.166.285.358a4.75 4.75 0 0 0 7.703 5.164c.163-.156.45-.062.459.163q.016.425.015.834v3c0 .809.424 1.92.92 2.915a18 18 0 0 0 .936 1.641l.014.022.004.006a.75.75 0 0 1-.624 1.166h-4.338a3.25 3.25 0 0 1-6.324 0H4.5a.75.75 0 0 1-.624-1.166l.004-.006.014-.022.06-.091c.05-.081.125-.2.215-.35.18-.301.42-.722.66-1.2.497-.994.921-2.106.921-2.915v-3c0-1.5.114-3.21 1.001-4.54.642-.964 1.625-1.646 3.037-1.979m.63 15.27h3.163A1.75 1.75 0 0 1 12 20.25a1.75 1.75 0 0 1-1.581-1"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBellDotFill;
