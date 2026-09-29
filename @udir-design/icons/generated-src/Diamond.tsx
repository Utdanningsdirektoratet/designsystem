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
const SvgDiamond = forwardRef<
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
          d="M11.47 1.57a.75.75 0 0 1 1.06 0l9.9 9.9a.75.75 0 0 1 0 1.06l-9.9 9.9a.75.75 0 0 1-1.06 0l-9.9-9.9a.75.75 0 0 1 0-1.06zM3.16 12l8.84 8.839L20.838 12 12 3.161z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDiamond;
