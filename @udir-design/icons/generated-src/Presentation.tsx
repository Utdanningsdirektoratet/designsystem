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
const SvgPresentation = forwardRef<
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
          d="M3 4.25a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h.25V16c0 .414.336.75.75.75h4.023l-.524 1.954a.75.75 0 1 0 1.449.388l.627-2.342h4.85l.627 2.342a.75.75 0 0 0 1.449-.388l-.524-1.954H20a.75.75 0 0 0 .75-.75V8.75H21a.75.75 0 0 0 .75-.75V5a.75.75 0 0 0-.75-.75zm5.983 11H19.25v-6.5H4.75v6.5zm11.267-8v-1.5H3.75v1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPresentation;
