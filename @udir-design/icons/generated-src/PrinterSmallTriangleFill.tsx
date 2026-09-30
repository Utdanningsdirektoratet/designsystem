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
const SvgPrinterSmallTriangleFill = forwardRef<
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
          d="M16.538 2.136a.75.75 0 0 0-1.312 0l-5 9a.75.75 0 0 0 .656 1.114h10a.75.75 0 0 0 .656-1.114zm-3.516.114a.25.25 0 0 1 .219.371l-1.667 3a.25.25 0 0 1-.219.129H6.5a.25.25 0 0 1-.25-.25V3A.75.75 0 0 1 7 2.25zm8.371 11.441a2.3 2.3 0 0 1-.511.059H19.5a.25.25 0 0 0-.25.25v4.5c0 .138.112.25.25.25H21a.75.75 0 0 0 .75-.75v-4.049c0-.178-.183-.3-.357-.26M8.632 11.53c-.002-.15-.117-.279-.266-.279H7a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-7a.25.25 0 0 0-.25-.25h-6.618a2.25 2.25 0 0 1-2.25-2.221m.72-1.908a.25.25 0 0 1-.219.129H7A2.25 2.25 0 0 0 4.75 12v6.5a.25.25 0 0 1-.25.25H3a.75.75 0 0 1-.75-.75V9c0-.966.784-1.75 1.75-1.75h6.244a.25.25 0 0 1 .219.371zM9.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m.75 2.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPrinterSmallTriangleFill;
