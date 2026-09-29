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
const SvgChat2Fill = forwardRef<
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
          d="M5 3.25A1.75 1.75 0 0 0 3.25 5v10a.75.75 0 0 0 1.085.67l1.502-.75a.75.75 0 0 0 .414-.67V8.5a2.25 2.25 0 0 1 2.25-2.25H17a.75.75 0 0 0 .75-.75V5A1.75 1.75 0 0 0 16 3.25zM7.25 9c0-.966.784-1.75 1.75-1.75h10c.966 0 1.75.784 1.75 1.75v11a.75.75 0 0 1-1.085.67l-3.842-1.92H9A1.75 1.75 0 0 1 7.25 17zm3 4a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.75-.75m3.75-.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm2.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H17a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgChat2Fill;
