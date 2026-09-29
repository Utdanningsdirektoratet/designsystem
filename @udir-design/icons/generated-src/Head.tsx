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
const SvgHead = forwardRef<
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
          d="M13 3.75A7.25 7.25 0 0 0 5.75 11v.11l-1.242 4.14H6a.75.75 0 0 1 .75.75v2c0 .69.56 1.25 1.25 1.25h3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-.75H8A2.75 2.75 0 0 1 5.25 18v-1.25H3.5a.75.75 0 0 1-.718-.966l1.469-4.896a8.75 8.75 0 1 1 15.499 5.68V21.5a.75.75 0 0 1-1.5 0v-5.492l.188-.213A7.25 7.25 0 0 0 13 3.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHead;
