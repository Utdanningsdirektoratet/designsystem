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
const SvgScissorsFill = forwardRef<
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
          d="M7.97 10.085A3.25 3.25 0 1 1 9.1 8.478l1.456.822 6.506-1.952a1.75 1.75 0 0 1 .79-.05l2.771.462a.75.75 0 0 1 .234 1.4L9.102 15.527q.146.462.148.973a3.25 3.25 0 1 1-1.28-2.585c.483-.66.685-1.462.607-2.241l-.112-.58a3.2 3.2 0 0 0-.495-1.009M4.25 7.5a1.75 1.75 0 1 1 3.159 1.039l-.012.015-.006.008A1.75 1.75 0 0 1 4.25 7.5m3.141 7.938a1.75 1.75 0 1 0-2.782 2.123 1.75 1.75 0 0 0 2.782-2.123m5.088-.607a.25.25 0 0 0 .047.46l4.536 1.36c.256.077.527.095.79.05l2.771-.461a.75.75 0 0 0 .225-1.405l-4.144-2.167a.25.25 0 0 0-.235.002z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgScissorsFill;
