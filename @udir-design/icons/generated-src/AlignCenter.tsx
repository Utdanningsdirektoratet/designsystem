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
const SvgAlignCenter = forwardRef<
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
          d="M12 3.25a.75.75 0 0 1 .75.75v1.25h5.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-5.75v2.5h2.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-2.75V20a.75.75 0 0 1-1.5 0v-1.25H8.5a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 .75-.75h2.75v-2.5H5.5a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75h5.75V4a.75.75 0 0 1 .75-.75m-.75 11.5h-2v2.5h2zm1.5 2.5h2v-2.5h-2zm-6.5-10.5h5v2.5h-5zm6.5 0v2.5h5v-2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAlignCenter;
