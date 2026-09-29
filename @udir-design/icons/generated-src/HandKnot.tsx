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
const SvgHandKnot = forwardRef<
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
          d="M10 2.25a2.75 2.75 0 0 0-2.75 2.718 7 7 0 0 0-.667-.4c-.295-.152-.688-.318-1.083-.318a2.25 2.25 0 0 0 0 4.5c.395 0 .788-.166 1.083-.318.228-.116.455-.257.667-.4v3.837l-.876-.75a2.721 2.721 0 0 0-3.948 3.699L7.4 21.45a.75.75 0 0 0 .6.3h11a.75.75 0 0 0 .732-.587l1.35-6.072a3.75 3.75 0 0 0-2.848-4.474L12.75 9.398V8.032c.212.143.44.284.667.4.294.152.688.318 1.083.318a2.25 2.25 0 0 0 0-4.5c-.395 0-.789.166-1.083.318a7 7 0 0 0-.667.4A2.75 2.75 0 0 0 10 2.25M8.75 5a1.25 1.25 0 1 1 2.5 0v.75h-2.5zm3.088 5.732A.75.75 0 0 1 11.25 10V7.25h-2.5v6.25a.75.75 0 0 1-1.238.57l-2.114-1.812a1.221 1.221 0 0 0-1.772 1.66l4.75 6.332h10.023l1.218-5.484a2.25 2.25 0 0 0-1.708-2.685zm1.54-4.09-.192-.142.191-.141a6 6 0 0 1 .726-.458q.17-.087.286-.124a.5.5 0 0 1 .111-.027.75.75 0 1 1 0 1.5c-.004 0-.04-.003-.111-.027a2 2 0 0 1-.286-.124 6 6 0 0 1-.726-.458M6.813 6.5l-.191-.141a6 6 0 0 0-.726-.458 2 2 0 0 0-.286-.124.5.5 0 0 0-.11-.027.75.75 0 0 0-.001 1.5c.004 0 .04-.003.111-.027q.116-.037.286-.124c.227-.117.48-.281.726-.458q.099-.07.191-.141"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHandKnot;
