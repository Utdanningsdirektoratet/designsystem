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
const SvgRulerFill = forwardRef<
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
          d="M8.392 3.47a.75.75 0 0 0-1.06 0L4.25 6.55a1.853 1.853 0 0 0 0 2.622L14.827 19.75a1.854 1.854 0 0 0 2.621 0l3.082-3.082a.75.75 0 0 0 0-1.06zm1.699 3.862a.03.03 0 0 1 .043 0L11.15 8.35a.03.03 0 0 1 0 .042l-1.103 1.104a.75.75 0 1 1-1.06-1.06zm2.758 2.758a.03.03 0 0 1 .043 0l1.017 1.018a.03.03 0 0 1 0 .043l-1.103 1.104a.75.75 0 0 1-1.06-1.061zm2.758 2.76a.03.03 0 0 1 .044 0l1.017 1.016a.03.03 0 0 1 0 .044l-1.103 1.103a.75.75 0 0 1-1.061-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRulerFill;
