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
const SvgFirstAid = forwardRef<
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
          d="M8.25 4A.75.75 0 0 1 9 3.25h6a.75.75 0 0 1 .75.75v4.25H20a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-4.25V20a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v-4.25H4a.75.75 0 0 1-.75-.75V9A.75.75 0 0 1 4 8.25h4.25zm1.5.75V9a.75.75 0 0 1-.75.75H4.75v4.5H9a.75.75 0 0 1 .75.75v4.25h4.5V15a.75.75 0 0 1 .75-.75h4.25v-4.5H15a.75.75 0 0 1-.75-.75V4.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFirstAid;
