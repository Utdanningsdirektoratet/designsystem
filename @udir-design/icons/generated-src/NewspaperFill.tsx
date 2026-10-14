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
const SvgNewspaperFill = forwardRef<
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
          d="M7 3.25a.75.75 0 0 0-.75.75v1.25H4a.75.75 0 0 0-.75.75v12.5a2.25 2.25 0 0 0 2.25 2.25H17A3.75 3.75 0 0 0 20.75 17V4a.75.75 0 0 0-.75-.75zm-1.5 16a.75.75 0 0 0 .75-.75V6.75h-1.5V18.5c0 .414.336.75.75.75m4.5-12a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75h7a.75.75 0 0 0 .75-.75V8a.75.75 0 0 0-.75-.75zm.75 4v-2.5h5.5v2.5zM9.25 16a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgNewspaperFill;
