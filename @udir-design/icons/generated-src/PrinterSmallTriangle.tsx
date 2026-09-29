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
const SvgPrinterSmallTriangle = forwardRef<
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
          d="M16.538 2.136a.75.75 0 0 0-1.312 0l-5 9a.75.75 0 0 0 .656 1.114h10a.75.75 0 0 0 .656-1.114zm-.656 1.908 3.725 6.706h-7.45zM7 2.25a.75.75 0 0 0-.75.75v4.25H4A1.75 1.75 0 0 0 2.25 9v9c0 .414.336.75.75.75h3.25V21c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-2.25H21a.75.75 0 0 0 .75-.75v-3.75a.75.75 0 0 0-1.5 0v3h-2.5v-3a.75.75 0 0 0-1.5 0v6h-8.5V12a.75.75 0 0 0-1.5 0v5.25h-2.5V9A.25.25 0 0 1 4 8.75h5.75a.75.75 0 0 0 0-1.5h-2v-3.5H12a.75.75 0 0 0 0-1.5zm3 12a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5zM9.25 18a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H10a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPrinterSmallTriangle;
