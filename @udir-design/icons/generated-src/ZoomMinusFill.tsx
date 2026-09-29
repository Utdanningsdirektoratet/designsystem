import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgZoomMinusFill = forwardRef<
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
          d="M3.25 10.5a7.25 7.25 0 1 1 12.88 4.568l5.412 5.412a.75.75 0 0 1-1.061 1.06l-5.412-5.41A7.25 7.25 0 0 1 3.25 10.5m3 0A.75.75 0 0 1 7 9.75h7a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgZoomMinusFill;
