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
const SvgCigarette = forwardRef<
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
          d="M18.25 2.5a.75.75 0 0 0-1.5 0v.882c0 .97.548 1.855 1.415 2.289.358.18.585.546.585.947V7.5a.75.75 0 0 0 1.5 0v-.882c0-.97-.548-1.855-1.415-2.289a1.06 1.06 0 0 1-.585-.947zM2.266 10a.75.75 0 0 1 .75-.75H20c.966 0 1.75.784 1.75 1.75v2A1.75 1.75 0 0 1 20 14.75H3.016a.75.75 0 0 1-.75-.75zM20 13.25a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.25-.25h-1.25v2.5zm-16.234-2.5H17.25v2.5H3.766z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCigarette;
