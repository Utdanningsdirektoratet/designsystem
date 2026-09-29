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
const SvgWheelchairFill = forwardRef<
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
          d="M4.25 4A.75.75 0 0 1 5 3.25h2a.75.75 0 0 1 .75.75v4.25H14A2.75 2.75 0 0 1 16.75 11v2.25H20a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75v-3c0-.69-.56-1.25-1.25-1.25H7A.75.75 0 0 1 6.25 9V4.75H5A.75.75 0 0 1 4.25 4m-1.5 12a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0m14.75-.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgWheelchairFill;
