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
const SvgBoatFill = forwardRef<
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
          d="M5.25 3A.75.75 0 0 1 6 2.25h12a.75.75 0 0 1 .75.75v6.653a.25.25 0 0 1-.324.239l-5.758-1.79a2.25 2.25 0 0 0-1.336 0l-5.758 1.79a.25.25 0 0 1-.324-.24zm8.25 2.75a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5zm-5.25.75A.75.75 0 0 1 9 5.75h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75m3.973 3.034a.75.75 0 0 0-.446 0l-7.326 2.278a.75.75 0 0 0-.476.99l3.327 8.472A.75.75 0 0 0 8 21.75h8a.75.75 0 0 0 .698-.476l3.327-8.472a.75.75 0 0 0-.476-.99z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBoatFill;
