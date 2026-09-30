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
const SvgPencilBoardFill = forwardRef<
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
          d="M13.216 11.287a.25.25 0 0 1 .033-.11l2.764-4.818a.25.25 0 0 1 .342-.092l2.788 1.62a.25.25 0 0 1 .091.34L16.47 13.05a.25.25 0 0 1-.078.083l-3.003 1.995a.25.25 0 0 1-.387-.223zM17.05 5.05a.25.25 0 0 1-.091-.34l.444-.774a1.85 1.85 0 0 1 2.54-.685 1.88 1.88 0 0 1 .68 2.556l-.443.772a.25.25 0 0 1-.342.091zm-5.294 6.354c.014-.232.082-.458.197-.66l1.216-2.12a.25.25 0 0 0-.217-.374H9.5a.25.25 0 0 0-.25.25v12c0 .138.112.25.25.25H18A2.75 2.75 0 0 0 20.75 18v-7c0-.463-.114-.899-.316-1.281-.085-.16-.306-.15-.397.007l-2.459 4.287a1.5 1.5 0 0 1-.47.502l-3.265 2.17a1.49 1.49 0 0 1-1.574.046 1.51 1.51 0 0 1-.747-1.395zM7.5 8.25a.25.25 0 0 1 .25.25v5a.25.25 0 0 1-.25.25h-4a.25.25 0 0 1-.25-.25V11A2.75 2.75 0 0 1 6 8.25zM3.25 15.5V18A2.75 2.75 0 0 0 6 20.75h1.5a.25.25 0 0 0 .25-.25v-5a.25.25 0 0 0-.25-.25h-4a.25.25 0 0 0-.25.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPencilBoardFill;
