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
const SvgPassportFill = forwardRef<
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
          d="M4.25 3A.75.75 0 0 1 5 2.25h12A2.75 2.75 0 0 1 19.75 5v14A2.75 2.75 0 0 1 17 21.75H5a.75.75 0 0 1-.75-.75zM9.5 6.75a.75.75 0 0 0-.75.75V11c0 .592.247 1.092.546 1.48.298.388.676.704 1.024.947a7.7 7.7 0 0 0 1.269.713.95.95 0 0 0 .822 0 7.657 7.657 0 0 0 1.269-.713c.348-.243.726-.56 1.024-.946.298-.389.546-.89.546-1.481V7.5a.75.75 0 0 0-.75-.75zm.75 4.25c0 .158.065.345.235.566.171.223.418.438.695.632.274.192.552.345.765.451l.055.028.055-.027c.213-.107.491-.26.765-.452.277-.194.524-.41.695-.632.17-.22.235-.408.235-.566V8.25h-3.5zm-.75 5.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPassportFill;
