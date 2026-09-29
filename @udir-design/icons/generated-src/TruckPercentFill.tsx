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
const SvgTruckPercentFill = forwardRef<
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
          d="M2.25 5.5c0-.69.497-1.25 1.111-1.25h9.778c.614 0 1.111.56 1.111 1.25v10.377a.26.26 0 0 1-.035.13 3.5 3.5 0 0 0-.456 1.493.264.264 0 0 1-.259.25H11a.265.265 0 0 1-.259-.25 3.5 3.5 0 0 0-6.982 0 .265.265 0 0 1-.259.25h-.139c-.614 0-1.111-.56-1.111-1.25zm18.787 12.129c.422-.2.713-.631.713-1.129v-3.596a.3.3 0 0 0-.018-.093l-1.91-4.775a1.25 1.25 0 0 0-1.16-.786H16a.25.25 0 0 0-.25.25v6.691c0 .184.192.306.366.247a3.5 3.5 0 0 1 4.619 2.984c.014.156.16.275.302.207M17.25 15.25a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m-12.5 2.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0m.47-5.78a.75.75 0 1 0 1.06 1.06l5-5a.75.75 0 0 0-1.06-1.06zm1.03-5.095a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25M9.125 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTruckPercentFill;
