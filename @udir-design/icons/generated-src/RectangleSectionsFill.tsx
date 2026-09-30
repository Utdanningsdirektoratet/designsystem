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
const SvgRectangleSectionsFill = forwardRef<
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
          d="M11.25 2.75a.5.5 0 0 0-.5-.5H3.002a.75.75 0 0 0-.75.75v10.75a.5.5 0 0 0 .5.5h7.998a.5.5 0 0 0 .5-.5v-11m-8.498 13a.5.5 0 0 0-.5.5V21c0 .414.336.75.75.75h7.748a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm9.998 5.5a.5.5 0 0 0 .5.5h7.748a.75.75 0 0 0 .75-.75V10.25a.5.5 0 0 0-.5-.5H13.25a.5.5 0 0 0-.5.5v11m8.498-13a.5.5 0 0 0 .5-.5V3a.75.75 0 0 0-.75-.75H13.25a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRectangleSectionsFill;
