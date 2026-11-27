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
const SvgTextCaseTitle = forwardRef<
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
          d="M8.513 4.75a.75.75 0 0 1 .693.496l4.5 12.5a.75.75 0 0 1-1.412.508l-1.262-3.504H5.607l-1.41 3.528a.75.75 0 0 1-1.393-.556l5-12.5.05-.104a.75.75 0 0 1 .659-.368m6.987-.5a.75.75 0 0 1 .75.75v6.59c.532-.508 1.22-.84 2-.84.971 0 1.8.513 2.362 1.244.562.73.888 1.707.888 2.756s-.326 2.026-.888 2.756-1.39 1.244-2.362 1.244c-.78 0-1.468-.332-2-.842V18a.75.75 0 1 1-1.5 0V5a.75.75 0 0 1 .75-.75m2.75 8c-.41 0-.83.214-1.173.66-.343.445-.577 1.094-.577 1.84s.234 1.395.577 1.84.764.66 1.173.66.83-.214 1.173-.66c.343-.445.577-1.094.577-1.84s-.234-1.395-.577-1.84-.764-.66-1.173-.66m-12.043 1h4.285l-2.03-5.639z"
        />
      </svg>
    );
  },
);
export default SvgTextCaseTitle;
