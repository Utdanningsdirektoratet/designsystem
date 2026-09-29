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
const SvgOpenSource = forwardRef<
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
          d="M6.065 4.265a9.75 9.75 0 1 1 10.81 16.179.75.75 0 0 1-1.024-.275l-3.15-5.456a.75.75 0 0 1 .274-1.024 1.95 1.95 0 1 0-1.95 0 .75.75 0 0 1 .274 1.024L8.15 20.17a.75.75 0 0 1-1.024.275 9.75 9.75 0 0 1-1.06-16.18M12 3.75a8.25 8.25 0 0 0-4.757 14.99l2.424-4.199a3.45 3.45 0 1 1 4.666 0l2.424 4.2A8.25 8.25 0 0 0 12 3.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgOpenSource;
