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
const SvgInboxUpFill = forwardRef<
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
          d="M11.47 3.47a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06l-2.22-2.22v5.69a.75.75 0 0 1-1.5 0V5.81L9.03 8.03a.75.75 0 0 1-1.06-1.06zM5.304 4.72A.75.75 0 0 1 6 4.25h1a.75.75 0 0 1 0 1.5h-.492l-2.4 6h2.774a1.75 1.75 0 0 1 1.565.967l.947 1.895a.25.25 0 0 0 .224.138h4.764a.25.25 0 0 0 .224-.138l.947-1.895a1.75 1.75 0 0 1 1.565-.967h2.774l-2.4-6H17a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .696.471l2.994 7.485a.75.75 0 0 1 .06.311V19a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-6.484a.75.75 0 0 1 .06-.31z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgInboxUpFill;
