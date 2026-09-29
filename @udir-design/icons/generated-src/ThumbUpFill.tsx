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
const SvgThumbUpFill = forwardRef<
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
          d="M9.876 2.584a.75.75 0 0 1 .624-.334h1.225a2.75 2.75 0 0 1 2.609 3.62l-.793 2.38h5.34a2.75 2.75 0 0 1 2.654 3.474l-1.91 7a2.75 2.75 0 0 1-2.653 2.026H11.5a1 1 0 0 1-.147-.015l-4.927-.985H3a.75.75 0 0 1-.75-.75V9A.75.75 0 0 1 3 8.25h3.099z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgThumbUpFill;
