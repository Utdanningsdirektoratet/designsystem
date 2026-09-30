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
const SvgBriefcase = forwardRef<
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
          d="M2.25 7.5c0-.69.56-1.25 1.25-1.25h4.25V5c0-.966.784-1.75 1.75-1.75h5c.966 0 1.75.784 1.75 1.75v1.25h4.25c.69 0 1.25.56 1.25 1.25v5c0 .69-.56 1.25-1.25 1.25h-.25v4.75c0 .69-.56 1.25-1.25 1.25H5c-.69 0-1.25-.56-1.25-1.25v-4.75H3.5c-.69 0-1.25-.56-1.25-1.25zm7-2.5a.25.25 0 0 1 .25-.25h5a.25.25 0 0 1 .25.25v1.25h-5.5zM12 15.75a.75.75 0 0 0 .75-.75v-1.25h6v4.5H5.25v-4.5h6V15c0 .414.336.75.75.75m0-5.5a.75.75 0 0 1 .75.75v1.25h7.5v-4.5H3.75v4.5h7.5V11a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBriefcase;
