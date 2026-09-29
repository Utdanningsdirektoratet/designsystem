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
const SvgGavel = forwardRef<
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
          d="M11.53 3.47a.75.75 0 0 0-1.06 0l-.707.707a1.75 1.75 0 0 0-.513 1.237v.673a.25.25 0 0 1-.073.176L6.262 9.187a.25.25 0 0 1-.177.073H5.41a1.75 1.75 0 0 0-1.23.507l-.709.7a.75.75 0 0 0-.002 1.063l4.5 4.5a.75.75 0 0 0 1.06 0l.707-.707a1.75 1.75 0 0 0 .513-1.237v-.672a.25.25 0 0 1 .073-.177l.927-.926 7.22 7.22a.75.75 0 1 0 1.06-1.061l-7.22-7.22.927-.927a.25.25 0 0 1 .177-.073h.672c.464 0 .909-.184 1.237-.513l.707-.707a.75.75 0 0 0 0-1.06zm-.707 1.767L11 5.061 14.44 8.5l-.177.177a.25.25 0 0 1-.177.073h-.672q-.27 0-.523.08l-2.22-2.22a1.8 1.8 0 0 0 .079-.523v-.673a.25.25 0 0 1 .073-.177M9.751 7.812 7.815 9.754l1.935 1.935 1.94-1.939zM6.085 10.76q.274 0 .532-.082L8.83 12.89a1.8 1.8 0 0 0-.08.523v.672a.25.25 0 0 1-.073.177l-.177.176-3.437-3.436.172-.17a.25.25 0 0 1 .176-.073z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGavel;
