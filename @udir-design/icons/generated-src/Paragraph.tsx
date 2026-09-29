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
const SvgParagraph = forwardRef<
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
          d="M11.997 2.25A3.747 3.747 0 0 0 8.75 7.864a3.292 3.292 0 0 0-.376 6.218l4.486 1.848a2.245 2.245 0 0 1-.857 4.32A2.25 2.25 0 0 1 9.75 18a.75.75 0 0 0-1.5 0 3.75 3.75 0 0 0 3.753 3.75 3.747 3.747 0 0 0 3.247-5.614 3.293 3.293 0 0 0 .376-6.218L11.14 8.07a2.245 2.245 0 0 1 .857-4.32A2.25 2.25 0 0 1 14.25 6a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.753-3.75m1.2 12.196.057.018.511.184a1.793 1.793 0 0 0 1.29-3.344l-4.251-1.75-.058-.018-.51-.184a1.793 1.793 0 0 0-1.29 3.344z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgParagraph;
