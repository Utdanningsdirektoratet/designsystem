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
const SvgHikingTrailSign = forwardRef<
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
          d="M11.5 2.25a.75.75 0 0 1 .75.75v2.25H17a.75.75 0 0 1 .6.3l3 4c.2.267.2.633 0 .9l-3 4a.75.75 0 0 1-.6.3h-4.75V21a.75.75 0 0 1-1.5 0v-6.25H4a.75.75 0 0 1-.6-1.2L6.063 10 3.4 6.45a.75.75 0 0 1 .6-1.2h6.75V3a.75.75 0 0 1 .75-.75m-3.9 8.2-2.1 2.8h11.125L19.063 10l-2.438-3.25H5.5l2.1 2.8c.2.267.2.633 0 .9"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHikingTrailSign;
