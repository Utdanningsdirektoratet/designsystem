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
const SvgSparkLarge = forwardRef<
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
          d="M12.75 3a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0zM15 11.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm-3 3a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75m-9-3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm15.894-6.144a.75.75 0 0 1 0 1.06l-4.243 4.243a.75.75 0 0 1-1.06-1.06l4.242-4.243a.75.75 0 0 1 1.061 0m-4.243 8.485a.75.75 0 1 0-1.06 1.06l4.242 4.243a.75.75 0 0 0 1.061-1.06zm-4.242 0a.75.75 0 0 1 0 1.06l-4.242 4.243a.75.75 0 1 1-1.061-1.06l4.243-4.243a.75.75 0 0 1 1.06 0M6.167 5.106a.75.75 0 1 0-1.061 1.06l4.243 4.243a.75.75 0 1 0 1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSparkLarge;
