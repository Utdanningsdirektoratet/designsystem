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
const SvgPrinterSmallFill = forwardRef<
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
          d="M6.25 3A.75.75 0 0 1 7 2.25h10a.75.75 0 0 1 .75.75v2.5a.25.25 0 0 1-.25.25h-11a.25.25 0 0 1-.25-.25zM4 7.25A1.75 1.75 0 0 0 2.25 9v9c0 .414.336.75.75.75h1.5a.25.25 0 0 0 .25-.25V12A2.25 2.25 0 0 1 7 9.75h10A2.25 2.25 0 0 1 19.25 12v6.5c0 .138.112.25.25.25H21a.75.75 0 0 0 .75-.75V9A1.75 1.75 0 0 0 20 7.25zM6.25 12a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75zm3 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m.75 2.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPrinterSmallFill;
