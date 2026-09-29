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
const SvgPersonHeadset = forwardRef<
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
          d="M8.25 7.5A3.75 3.75 0 1 1 9 9.75h1.5a.75.75 0 0 0 0-1.5H8.325a3.8 3.8 0 0 1-.075-.75M12 12.75a5.25 5.25 0 0 1-4.745-3H5A.75.75 0 0 1 4.25 9V6.5a.75.75 0 0 1 1.5 0v1.75h1.053A5.25 5.25 0 1 1 12 12.75m-3.712 4.538A5.25 5.25 0 0 1 17.25 21a.75.75 0 0 0 1.5 0 6.75 6.75 0 0 0-13.5 0 .75.75 0 0 0 1.5 0 5.25 5.25 0 0 1 1.538-3.712M19.75 6.5a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonHeadset;
