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
const SvgTag = forwardRef<
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
          d="M13.44 5.616a1.25 1.25 0 0 1 .884-.366h4.172a.25.25 0 0 1 .25.25v4.172c0 .331-.132.649-.366.883l-8.207 8.208a.25.25 0 0 1-.354 0l-4.586-4.586a.25.25 0 0 1 0-.354zm.884-1.866c-.73 0-1.429.29-1.944.805l-8.207 8.208a1.75 1.75 0 0 0 0 2.474l4.585 4.586a1.75 1.75 0 0 0 2.475 0l8.207-8.207a2.75 2.75 0 0 0 .806-1.944V5.5a1.75 1.75 0 0 0-1.75-1.75zM15.496 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTag;
