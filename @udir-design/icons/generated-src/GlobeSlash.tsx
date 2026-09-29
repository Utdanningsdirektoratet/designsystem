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
const SvgGlobeSlash = forwardRef<
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
          d="M2.25 12c0-1.09.179-2.14.51-3.118a.8.8 0 0 1 .09-.255 9.754 9.754 0 0 1 15.494-4.031L19.47 3.47a.75.75 0 1 1 1.06 1.06l-16 16a.75.75 0 0 1-1.06-1.06l1.126-1.126a9.7 9.7 0 0 1-1.746-2.97.8.8 0 0 1-.09-.257A9.7 9.7 0 0 1 2.25 12m1.5 0c0-.78.108-1.535.31-2.25h4.18a34.5 34.5 0 0 0 0 4.5H4.06A8.3 8.3 0 0 1 3.75 12m1.91 5.28 1.53-1.53H4.65c.28.548.62 1.06 1.01 1.53m4.03-4.03 3.5-3.5H9.742a33 33 0 0 0-.053 3.5m5.842-5.843L17.28 5.66a8.2 8.2 0 0 0-2.268-1.343c.216 1.052.39 2.079.521 3.09M8.99 4.317a41 41 0 0 0-.621 3.933h-3.72a8.28 8.28 0 0 1 4.34-3.934m1.63-.452a41 41 0 0 0-.742 4.385h4.245a41 41 0 0 0-.742-4.385 8.3 8.3 0 0 0-2.76 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGlobeSlash;
