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
const SvgSpeakerSlashFill = forwardRef<
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
          d="M20.53 4.53a.75.75 0 0 0-1.06-1.06l-16 16a.75.75 0 1 0 1.06 1.06zM9.563 18.011a.25.25 0 0 1-.02-.372l2.78-2.78a.25.25 0 0 1 .427.177V19a.75.75 0 0 1-1.219.586zm9.775-10.167a.255.255 0 0 0-.043.3c.61 1.15.955 2.463.955 3.856 0 2.28-.924 4.341-2.418 5.835a.75.75 0 0 0 1.06 1.061A9.72 9.72 0 0 0 21.75 12a9.7 9.7 0 0 0-1.288-4.847.244.244 0 0 0-.385-.048zm-2.28 2.28a.26.26 0 0 0-.06.261c.163.509.252 1.052.252 1.615 0 1.45-.587 2.763-1.54 3.714a.75.75 0 1 0 1.06 1.061A6.73 6.73 0 0 0 18.75 12a6.7 6.7 0 0 0-.514-2.588.24.24 0 0 0-.394-.072zm-2.502 2.502a.26.26 0 0 0-.066.114 2.66 2.66 0 0 1-.676 1.142.75.75 0 1 0 1.06 1.061 4.15 4.15 0 0 0 1.204-3.311c-.018-.199-.255-.273-.396-.132zm-1.88-4.485a.25.25 0 0 0 .074-.177V5a.75.75 0 0 0-1.219-.586L6.805 8.195a.25.25 0 0 1-.156.055H3a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h1.964a.25.25 0 0 0 .177-.073z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSpeakerSlashFill;
