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
const SvgDishwasher = forwardRef<
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
          d="M4.25 4A.75.75 0 0 1 5 3.25h14a.75.75 0 0 1 .75.75v8.25H20a.75.75 0 0 1 .721.956l-2 7a.75.75 0 0 1-.721.544H6a.75.75 0 0 1-.721-.544l-2-7A.75.75 0 0 1 4 12.25h.25zm.744 9.75 1.572 5.5h10.868l1.572-5.5zm12.745-1.5q.01-.124.011-.25a2.75 2.75 0 0 0-4.25-2.305A2.74 2.74 0 0 0 12 9.25c-.553 0-1.069.163-1.5.445A2.75 2.75 0 0 0 6.26 12.25H5.75v-4.5h12.5v4.5zM9 10.75q.269.002.5.104a2.74 2.74 0 0 0-.239 1.396H7.775A1.25 1.25 0 0 1 9 10.75m3.261 1.5a2.76 2.76 0 0 1 .239-1.396 1.25 1.25 0 0 0-1.725 1.396zM16.25 12q0 .13-.025.25h-2.45A1.25 1.25 0 1 1 16.25 12m2-7.25v1.5H5.75v-1.5zM10 15.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDishwasher;
