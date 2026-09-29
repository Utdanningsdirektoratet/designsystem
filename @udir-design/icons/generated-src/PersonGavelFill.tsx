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
const SvgPersonGavelFill = forwardRef<
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
          d="M6.75 7.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0m.477 8.727a6.75 6.75 0 0 1 6.176-1.83c.187.04.248.27.113.405l-.107.107a2.25 2.25 0 0 0 0 3.182l.232.232a.25.25 0 0 1 0 .354l-1.232 1.232a2.24 2.24 0 0 0-.659 1.562c-.002.15-.117.279-.265.279H6a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 1.977-4.773m9.753 5.475a.028.028 0 1 0 .04.04.028.028 0 0 0-.04-.04M17 19.56l1.47 1.47a.75.75 0 0 0 1.06 0l2-2a.75.75 0 0 0 0-1.061l-4-4a.75.75 0 0 0-1.06 0l-2 2a.75.75 0 0 0 0 1.06l1.47 1.47-2.47 2.47a.75.75 0 1 0 1.06 1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonGavelFill;
