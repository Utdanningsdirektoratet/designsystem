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
const SvgStarFill = forwardRef<
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
          d="M12 2.25a.75.75 0 0 1 .672.418l2.765 5.601 6.181.899a.75.75 0 0 1 .416 1.279l-4.473 4.36 1.056 6.156a.75.75 0 0 1-1.088.791l-5.53-2.907-5.528 2.907a.75.75 0 0 1-1.088-.79l1.056-6.157-4.473-4.36a.75.75 0 0 1 .415-1.28l6.182-.898 2.764-5.6A.75.75 0 0 1 12 2.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgStarFill;
