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
const SvgPillRectangle = forwardRef<
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
          d="M18.894 5.106a3.75 3.75 0 0 0-5.303 0L5.106 13.59a3.75 3.75 0 1 0 5.303 5.303l8.485-8.485a3.75 3.75 0 0 0 0-5.303m-4.242 1.06a2.25 2.25 0 1 1 3.182 3.182L14.12 13.06 10.94 9.88zM9.879 10.94l-3.713 3.713a2.25 2.25 0 1 0 3.182 3.182l3.713-3.713z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPillRectangle;
