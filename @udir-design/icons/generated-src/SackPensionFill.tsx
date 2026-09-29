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
const SvgSackPensionFill = forwardRef<
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
          d="M15.264 4.254a.257.257 0 0 0 .328-.159l.074-.223c.429-1.285-.69-2.515-1.98-2.31-.672.106-1.324.188-1.686.188-.363 0-1.014-.082-1.687-.189-1.29-.204-2.408 1.026-1.98 2.31l.075.225a.257.257 0 0 0 .328.158c.981-.34 2.073-.504 3.264-.504s2.283.164 3.264.504M7.817 6.379C8.884 5.643 10.26 5.25 12 5.25s3.116.393 4.183 1.13c1.068.735 1.758 1.767 2.204 2.925.817 2.12.86 4.8.863 7.204.128.065.27.145.416.242.42.28 1.084.85 1.084 1.749 0 .77-.388 1.324-.72 1.655a3 3 0 0 1-.694.515.75.75 0 0 1-.336.08H5a.8.8 0 0 1-.415-.122 3.029 3.029 0 0 1-.615-.472c-.332-.332-.72-.887-.72-1.656 0-.898.664-1.469 1.084-1.749.145-.097.289-.177.416-.242.002-2.404.046-5.085.863-7.204.446-1.158 1.136-2.19 2.204-2.926M10.25 10.5a.75.75 0 0 1 .75-.75h1.5v.75-.75h.042l.076.005a2.592 2.592 0 0 1 .967.262c.277.138.576.357.805.7.231.347.36.777.36 1.283s-.129.936-.36 1.283a2.07 2.07 0 0 1-.805.7 2.6 2.6 0 0 1-1.043.266h-.026l-.009.001h-.006l-.001-.75v.75h-.75V16a.75.75 0 0 1-1.5 0zm1.5 2.25h.743l.018-.001q.033-.002.1-.012c.092-.015.202-.045.304-.095a.57.57 0 0 0 .227-.19c.05-.075.108-.208.108-.452s-.059-.377-.108-.451a.57.57 0 0 0-.227-.19 1.1 1.1 0 0 0-.422-.109h-.743z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSackPensionFill;
