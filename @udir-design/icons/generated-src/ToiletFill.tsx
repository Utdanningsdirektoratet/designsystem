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
const SvgToiletFill = forwardRef<
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
          d="M6.51 4.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 0 1.5h-.51l-.318 3.771a.25.25 0 0 1-.25.229H7.077a.25.25 0 0 1-.249-.229zM5.25 11a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 .75.75c0 1.56-1.216 2.949-2.81 3.796l.799 4.575a.75.75 0 0 1-.739.879H8a.75.75 0 0 1-.739-.88l.8-4.574C6.466 13.948 5.25 12.56 5.25 11"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgToiletFill;
