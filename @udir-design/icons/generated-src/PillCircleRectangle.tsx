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
const SvgPillCircleRectangle = forwardRef<
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
          d="M8.44 4.916a2.75 2.75 0 1 0-1.88 5.168 2.75 2.75 0 0 0 1.88-5.168m-4.934 1.13a4.25 4.25 0 1 1 7.988 2.908 4.25 4.25 0 0 1-7.988-2.908m6.108.685a.75.75 0 0 1-.448.96l-2.82 1.027a.75.75 0 1 1-.512-1.41l2.819-1.026a.75.75 0 0 1 .961.449m5.27 1.082a3.75 3.75 0 1 1 5.303 5.303l-7.07 7.071a3.75 3.75 0 0 1-5.304-5.303zm1.06 1.06L12.94 11.88l3.182 3.182 3.005-3.006a2.25 2.25 0 0 0-3.182-3.182m-7.07 7.072 3.005-3.006 3.182 3.182-3.005 3.006a2.25 2.25 0 1 1-3.182-3.182"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPillCircleRectangle;
