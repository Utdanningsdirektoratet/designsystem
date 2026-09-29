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
const SvgRockingHorse = forwardRef<
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
          d="M10.75 3a.75.75 0 0 0-1.5 0v.354a3 3 0 0 0-.325-.128c-.704-.234-1.542-.256-2.26.103l-3 1.5-.097.054a2.669 2.669 0 0 0-.653.586c-.35.436-.665 1.099-.665 2.031s.316 1.595.664 2.031c.17.213.344.366.48.468.114.085.19.13.27.172a.75.75 0 0 0 .46.069l2.126-.355V13c0 .744.364 1.425.845 1.905.332.333.76.61 1.24.749L7.06 18.203q-.531-.466-.977-1.018a.75.75 0 1 0-1.166.944 9.73 9.73 0 0 0 7.583 3.62 9.73 9.73 0 0 0 7.583-3.62.75.75 0 1 0-1.166-.944 8.3 8.3 0 0 1-.977 1.018l-1.26-2.52c.93-.189 1.567-.761 1.963-1.422.463-.772.607-1.665.607-2.26a4 4 0 0 0-.008-.251H20a.25.25 0 0 1 .25.25v3a.75.75 0 0 0 1.5 0v-3A1.75 1.75 0 0 0 20 10.25h-1.1a4 4 0 0 0-.257-.51c-.486-.812-1.336-1.49-2.643-1.49h-3.962c-.102-.297-.24-.697-.394-1.127-.28-.784-.627-1.718-.894-2.293zM8.29 19.097a8.2 8.2 0 0 0 4.21 1.153 8.2 8.2 0 0 0 4.21-1.153l-1.674-3.347H9.964zM9.334 5.345l-.01-.018c-.142-.279-.457-.539-.874-.678-.42-.14-.833-.119-1.115.022L4.347 6.165l-.053.037a1.2 1.2 0 0 0-.208.204c-.152.19-.336.526-.336 1.094s.184.905.336 1.094q.053.068.103.114l2.688-.448A.75.75 0 0 1 7.75 9v4c0 .256.136.575.405.845.27.27.589.405.845.405.173 0 .347-.005.52 0h5.96c.172-.005.347 0 .52 0 .693 0 1.093-.322 1.357-.76.287-.479.393-1.085.393-1.49 0-.404-.106-1.01-.393-1.489-.264-.439-.664-.76-1.357-.76h-4.5a.75.75 0 0 1-.711-.514l-.011-.032-.033-.096a82 82 0 0 0-.514-1.482c-.314-.879-.67-1.826-.897-2.282"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRockingHorse;
