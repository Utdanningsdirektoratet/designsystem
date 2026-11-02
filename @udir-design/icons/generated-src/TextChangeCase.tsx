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
const SvgTextChangeCase = forwardRef<
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
          d="M5.013 10.757a3.136 3.136 0 0 1 4.237 2.936V18a.75.75 0 0 1-1.49.12l-1.054.44a2.79 2.79 0 0 1-2.44-.144l-.08-.045c-1.852-1.042-1.861-3.706-.016-4.76.413-.237.881-.361 1.357-.361h2.159a1.63 1.63 0 0 0-.59-.866 1.64 1.64 0 0 0-1.556-.223l-.776.291a.75.75 0 0 1-.528-1.404zm11-6.007a.75.75 0 0 1 .693.496l4.5 12.5a.75.75 0 0 1-1.412.508l-1.262-3.504h-5.424l-1.412 3.528a.75.75 0 0 1-1.392-.556l5-12.5.05-.104a.75.75 0 0 1 .659-.368m-10.486 10a1.237 1.237 0 0 0-.606 2.314l.081.045a1.29 1.29 0 0 0 1.127.067L7.75 16.5v-1.75zm8.18-1.5h4.285l-2.03-5.639z"
        />
      </svg>
    );
  },
);
export default SvgTextChangeCase;
