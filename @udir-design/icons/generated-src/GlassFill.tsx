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
const SvgGlassFill = forwardRef<
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
          d="M5.953 3.486A.75.75 0 0 1 6.5 3.25h11a.75.75 0 0 1 .749.797l-.883 14.125a2.75 2.75 0 0 1-2.745 2.578H9.38a2.75 2.75 0 0 1-2.745-2.578L5.751 4.047a.75.75 0 0 1 .202-.56M7.298 4.75l.157 2.5h9.09l.157-2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGlassFill;
