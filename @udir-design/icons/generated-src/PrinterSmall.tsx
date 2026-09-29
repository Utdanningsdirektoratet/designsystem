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
const SvgPrinterSmall = forwardRef<
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
          d="M7 2.25a.75.75 0 0 0-.75.75v4.25H4A1.75 1.75 0 0 0 2.25 9v9c0 .414.336.75.75.75h3.25V21c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-2.25H21a.75.75 0 0 0 .75-.75V9A1.75 1.75 0 0 0 20 7.25h-2.25V3a.75.75 0 0 0-.75-.75zM3.75 9A.25.25 0 0 1 4 8.75h16a.25.25 0 0 1 .25.25v8.25h-2.5V12a.75.75 0 0 0-.75-.75H7a.75.75 0 0 0-.75.75v5.25h-2.5zm12.5-1.75v-3.5h-8.5v3.5zm-8.5 5.5v7.5h8.5v-7.5zM9.25 15a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H10a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPrinterSmall;
