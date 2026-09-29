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
const SvgBranching = forwardRef<
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
          d="M12.25 5.5a2.25 2.25 0 0 1-1.5 2.122v4.628H12A4.25 4.25 0 0 0 16.25 8v-.378a2.25 2.25 0 1 1 1.5 0V8A5.75 5.75 0 0 1 12 13.75h-1.25v2.628a2.251 2.251 0 1 1-1.5 0V7.622a2.25 2.25 0 1 1 3-2.122M10 4.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m7 1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M9.25 18.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBranching;
