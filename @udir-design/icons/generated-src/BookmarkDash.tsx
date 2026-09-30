import {
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
const SvgBookmarkDash = forwardRef<
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
          d="M8 4.75a.25.25 0 0 0-.25.25v1.875a.75.75 0 0 1-1.5 0V5c0-.966.784-1.75 1.75-1.75h2a.75.75 0 0 1 0 1.5zM13.25 4a.75.75 0 0 1 .75-.75h2c.966 0 1.75.784 1.75 1.75v1.875a.75.75 0 0 1-1.5 0V5a.25.25 0 0 0-.25-.25h-2a.75.75 0 0 1-.75-.75M7 9.875a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0v-3.75a.75.75 0 0 1 .75-.75m10 0a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0v-3.75a.75.75 0 0 1 .75-.75m-5.53 4.595a.75.75 0 0 1 1.06 0l1.25 1.25a.75.75 0 1 1-1.06 1.06l-.72-.72-.72.72a.75.75 0 1 1-1.06-1.06zM7 17.375a.75.75 0 0 1 .75.75v.066a.75.75 0 0 1 1.03 1.09l-1.25 1.25A.75.75 0 0 1 6.25 20v-1.875a.75.75 0 0 1 .75-.75m10 0a.75.75 0 0 1 .75.75V20a.75.75 0 0 1-1.28.53l-1.25-1.25a.75.75 0 0 1 1.03-1.089v-.066a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBookmarkDash;
