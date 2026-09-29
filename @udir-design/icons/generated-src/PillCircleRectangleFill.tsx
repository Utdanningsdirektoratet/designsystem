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
const SvgPillCircleRectangleFill = forwardRef<
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
          d="M6.047 11.494a4.25 4.25 0 1 1 2.907-7.988 4.25 4.25 0 0 1-2.907 7.988M9.614 6.73a.75.75 0 0 1-.448.96l-2.82 1.027a.75.75 0 1 1-.512-1.41l2.819-1.026a.75.75 0 0 1 .96.449m5.27 1.082a3.75 3.75 0 1 1 5.303 5.303l-2.829 2.83a.25.25 0 0 1-.353 0l-4.95-4.95a.25.25 0 0 1 0-.354zm1.06 9.193a.25.25 0 0 1 0 .353l-2.828 2.828a3.75 3.75 0 0 1-5.303-5.303l2.828-2.828a.25.25 0 0 1 .354 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPillCircleRectangleFill;
