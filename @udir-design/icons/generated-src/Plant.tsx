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
const SvgPlant = forwardRef<
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
          d="M13.908 8.187c.464-.211.958-.418 1.432-.583.554-.193 1.153-.354 1.66-.354.897 0 1.833.295 2.494.873.696.61 1.076 1.54.718 2.614-.336 1.006-1.07 1.617-1.937 1.929-.84.302-1.809.33-2.724.22a10.5 10.5 0 0 1-2.645-.69 7.6 7.6 0 0 1-1.389-.722 4.7 4.7 0 0 0-.62.844c-.499.847-1.036 2.255-1.132 4.472 2.444.262 3.777 1.753 4.417 2.825a.75.75 0 0 1-1.287.77c-.532-.89-1.654-2.135-3.895-2.135s-3.363 1.245-3.895 2.135a.75.75 0 0 1-1.287-.77c.642-1.076 1.984-2.575 4.446-2.828.098-2.471.699-4.14 1.34-5.23.292-.497.589-.867.843-1.133-.74-.972-1.483-2.43-1.746-3.88-.166-.907-.157-1.887.231-2.762.401-.904 1.167-1.606 2.33-1.994a2.1 2.1 0 0 1 1.576.078c.459.212.819.568 1.089.954.534.763.823 1.791.823 2.68 0 .514-.165 1.087-.362 1.603-.138.363-.305.732-.48 1.084m-1.699-4.96a.6.6 0 0 0-.472-.016c-.808.27-1.222.702-1.434 1.18-.224.504-.26 1.151-.127 1.885.207 1.134.785 2.295 1.347 3.08a21 21 0 0 0 .815-1.396c.242-.454.477-.94.649-1.391.178-.468.263-.833.263-1.07 0-.61-.21-1.332-.552-1.819-.167-.239-.338-.383-.489-.452m.517 7.229.197-.107c.344-.183.817-.427 1.334-.67.519-.245 1.07-.483 1.575-.658.524-.182.925-.271 1.168-.271.603 0 1.167.205 1.506.502.304.265.425.584.282 1.01-.165.496-.508.808-1.02.992-.54.194-1.252.237-2.04.142a9 9 0 0 1-2.257-.59 7 7 0 0 1-.745-.35"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPlant;
