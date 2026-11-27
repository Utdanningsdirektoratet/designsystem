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
const SvgTextCaseUppercase = forwardRef<
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
          d="M7.513 4.75a.75.75 0 0 1 .693.496l4.5 12.5a.75.75 0 0 1-1.412.508l-1.262-3.504H4.607l-1.41 3.528a.75.75 0 0 1-1.393-.556l5-12.5.05-.104a.75.75 0 0 1 .659-.368m9.487 0a3.75 3.75 0 0 1 2.598 6.452 3.999 3.999 0 0 1-1.848 7.548H14.5a.75.75 0 0 1-.75-.75V5.5a.75.75 0 0 1 .75-.75zm-1.75 12.5h2.5a2.5 2.5 0 1 0 0-5h-2.5zm-10.043-4h4.285L7.462 7.61zm10.043-2.5H17a2.25 2.25 0 1 0 0-4.5h-1.75z"
        />
      </svg>
    );
  },
);
export default SvgTextCaseUppercase;
