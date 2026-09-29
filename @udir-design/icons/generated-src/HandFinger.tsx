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
const SvgHandFinger = forwardRef<
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
          d="M10 3.75c-.69 0-1.25.56-1.25 1.25v8.5a.75.75 0 0 1-1.238.57l-2.114-1.812a1.221 1.221 0 0 0-1.772 1.66l4.75 6.332h10.023l1.218-5.484a2.25 2.25 0 0 0-1.708-2.685l-6.071-1.349A.75.75 0 0 1 11.25 10V5c0-.69-.56-1.25-1.25-1.25M7.25 5a2.75 2.75 0 1 1 5.5 0v4.398l5.484 1.22a3.75 3.75 0 0 1 2.848 4.473l-1.35 6.072a.75.75 0 0 1-.732.587H8a.75.75 0 0 1-.6-.3l-4.974-6.632a2.722 2.722 0 0 1 3.948-3.7l.876.751z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHandFinger;
