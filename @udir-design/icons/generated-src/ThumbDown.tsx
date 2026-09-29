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
const SvgThumbDown = forwardRef<
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
          d="M16.973 2.25c1.24 0 2.327.83 2.653 2.026l1.908 7a2.75 2.75 0 0 1-2.652 3.474H13.54l.793 2.38a2.75 2.75 0 0 1-2.608 3.62H10.5a.75.75 0 0 1-.624-.334L6.099 14.75H3a.75.75 0 0 1-.75-.75V4A.75.75 0 0 1 3 3.25h3.426l4.926-.985a1 1 0 0 1 .148-.015zM6.647 4.735a1 1 0 0 1-.147.015H3.75v8.5H6.5a.75.75 0 0 1 .624.334l3.777 5.666h.825a1.25 1.25 0 0 0 1.185-1.645l-1.123-3.368a.75.75 0 0 1 .712-.987h6.382a1.25 1.25 0 0 0 1.206-1.58l-1.91-7a1.25 1.25 0 0 0-1.205-.92h-5.399z"
        />
      </svg>
    );
  },
);
export default SvgThumbDown;
