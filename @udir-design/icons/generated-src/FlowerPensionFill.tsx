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
const SvgFlowerPensionFill = forwardRef<
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
          d="M5.25 8.5a6.75 6.75 0 1 1 7.5 6.709V21.5a.75.75 0 0 1-1.5 0v-6.291a6.75 6.75 0 0 1-6-6.709m5-2.5a.75.75 0 0 1 .75-.75h1.5V6v-.75h.042l.076.005a2.593 2.593 0 0 1 .967.262c.277.138.576.357.805.7.231.347.36.777.36 1.283s-.129.936-.36 1.283a2.07 2.07 0 0 1-.805.7 2.6 2.6 0 0 1-1.043.266h-.026l-.009.001h-.006L12.5 9v.75h-.75v1.75a.75.75 0 0 1-1.5 0zm1.5 2.25h.753l.008-.001q.033-.002.1-.012c.092-.015.202-.045.304-.095a.57.57 0 0 0 .227-.19c.05-.075.108-.208.108-.452s-.059-.377-.108-.451a.57.57 0 0 0-.227-.19 1.1 1.1 0 0 0-.422-.109h-.743zm-8.248 6H3.5a.75.75 0 0 0-.75.75c0 1.631.41 2.904 1.063 3.885.65.975 1.513 1.616 2.352 2.036a8.1 8.1 0 0 0 2.274.725 8 8 0 0 0 .969.102l.092.002a.75.75 0 0 0 .75-.75c0-1.631-.41-2.904-1.063-3.885-.65-.975-1.513-1.616-2.352-2.036a8.1 8.1 0 0 0-2.274-.725 8 8 0 0 0-.969-.102zm16.998 0a.75.75 0 0 1 .75.75c0 1.631-.41 2.904-1.064 3.885-.65.975-1.512 1.616-2.35 2.036a8.1 8.1 0 0 1-2.275.725 8 8 0 0 1-.969.102l-.09.002H14.5a.75.75 0 0 1-.75-.75c0-1.631.41-2.904 1.063-3.885.65-.975 1.513-1.616 2.352-2.036a8.1 8.1 0 0 1 2.274-.725 8 8 0 0 1 .969-.102l.088-.002h.004"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFlowerPensionFill;
