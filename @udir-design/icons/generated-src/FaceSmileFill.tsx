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
const SvgFaceSmileFill = forwardRef<
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
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m5-2a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m.343 4.541a.75.75 0 0 1 1.037.223c.693 1.072 1.993 1.657 3.37 1.657s2.678-.585 3.37-1.657a.75.75 0 0 1 1.26.814c-1.03 1.595-2.868 2.343-4.63 2.343s-3.6-.748-4.63-2.343a.75.75 0 0 1 .223-1.037M13.75 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFaceSmileFill;
