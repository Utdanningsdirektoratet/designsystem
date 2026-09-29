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
const SvgRotateRight = forwardRef<
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
          d="M8.97 2.97a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 0 1 .22.523v.014a.75.75 0 0 1-.22.523l-2.5 2.5a.75.75 0 1 1-1.06-1.06l1.22-1.22H7A2.25 2.25 0 0 0 4.75 9v4.5a.75.75 0 0 1-1.5 0V9A3.75 3.75 0 0 1 7 5.25h3.19L8.97 4.03a.75.75 0 0 1 0-1.06M13 11.25A1.75 1.75 0 0 0 11.25 13v6c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 20.75 19v-6A1.75 1.75 0 0 0 19 11.25zM12.75 13a.25.25 0 0 1 .25-.25h6a.25.25 0 0 1 .25.25v6a.25.25 0 0 1-.25.25h-6a.25.25 0 0 1-.25-.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRotateRight;
