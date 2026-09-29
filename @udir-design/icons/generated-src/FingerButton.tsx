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
const SvgFingerButton = forwardRef<
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
          d="M7 2.25A2.75 2.75 0 0 0 4.25 5v3a2.75 2.75 0 0 0 2.063 2.663.75.75 0 1 0 .374-1.452A1.25 1.25 0 0 1 5.75 8V5c0-.69.56-1.25 1.25-1.25h10c.69 0 1.25.56 1.25 1.25v3c0 .69-.56 1.25-1.25 1.25h-2.5a.75.75 0 0 0 0 1.5H17A2.75 2.75 0 0 0 19.75 8V5A2.75 2.75 0 0 0 17 2.25zM9.75 8.5a.75.75 0 0 1 1.5 0v4c0 .373.274.69.644.742l3.655.523a2.25 2.25 0 0 1 1.856 2.807l-.981 3.678H9.35l-3.87-4.644a.799.799 0 0 1 1.125-1.124l1.914 1.594a.75.75 0 0 0 1.23-.576zm.75-2.25A2.25 2.25 0 0 0 8.25 8.5v5.399l-.683-.57a2.299 2.299 0 0 0-3.238 3.238l4.095 4.913a.75.75 0 0 0 .576.27h8a.75.75 0 0 0 .725-.557l1.129-4.235a3.75 3.75 0 0 0-3.093-4.678l-3.011-.43V8.5a2.25 2.25 0 0 0-2.25-2.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFingerButton;
