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
const SvgMobileTriangleFill = forwardRef<
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
          d="M16.656 1.636a.75.75 0 0 0-1.312 0l-5 9A.75.75 0 0 0 11 11.75h10a.75.75 0 0 0 .656-1.114zM18.5 13.25a.25.25 0 0 1 .25.25V19A2.75 2.75 0 0 1 16 21.75H8A2.75 2.75 0 0 1 5.25 19V5A2.75 2.75 0 0 1 8 2.25h4.862a.25.25 0 0 1 .219.371L9.033 9.907A2.25 2.25 0 0 0 11 13.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMobileTriangleFill;
