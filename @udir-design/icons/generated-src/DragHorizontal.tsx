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
const SvgDragHorizontal = forwardRef<
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
          d="M7.5 8.25a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m6 1.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m0 4.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m-4.5 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7.5-6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3m1.5 6a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDragHorizontal;
