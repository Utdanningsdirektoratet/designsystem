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
const SvgClockDashed = forwardRef<
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
          d="M4.5 1.75a.75.75 0 0 1 .75.75v2.464a9.75 9.75 0 1 1 12.342 15.023.75.75 0 1 1-.86-1.229A8.251 8.251 0 1 0 6.084 6.25H9a.75.75 0 0 1 0 1.5H4.5A.75.75 0 0 1 3.75 7V2.5a.75.75 0 0 1 .75-.75M12.75 6a.75.75 0 0 0-1.5 0v6c0 .199.079.39.22.53l2.5 2.5a.75.75 0 1 0 1.06-1.06l-2.28-2.28zM3 11.25a.75.75 0 0 1 .75.75q0 .66.105 1.31a.75.75 0 0 1-1.481.24A10 10 0 0 1 2.25 12a.75.75 0 0 1 .75-.75m1.855 4.875a.75.75 0 0 0-1.299.75q.39.675.882 1.28a.75.75 0 1 0 1.163-.947 8 8 0 0 1-.746-1.083m1.995 3.294a.75.75 0 0 1 1.025-.274q.57.33 1.188.564a.75.75 0 1 1-.535 1.402 10 10 0 0 1-1.403-.667.75.75 0 0 1-.275-1.025m6.7 2.207a.75.75 0 1 0-.24-1.48q-.65.104-1.31.104a.75.75 0 0 0 0 1.5q.78 0 1.55-.124"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgClockDashed;
