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
const SvgHospitalFill = forwardRef<
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
          d="M5 2.25a.75.75 0 0 0-.75.75v18c0 .414.336.75.75.75h6a.25.25 0 0 0 .25-.25V17a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v4.5c0 .138.112.25.25.25H19a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75zm9.5 19.5a.25.25 0 0 0 .25-.25V18a.25.25 0 0 0-.25-.25H13a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25zm-6-9.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75M9.25 17a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0zM12 12.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75m4.25.75a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0zM12 5.25a.75.75 0 0 1 .75.75v1c0 .138.112.25.25.25h1a.75.75 0 0 1 0 1.5h-1a.25.25 0 0 0-.25.25v1a.75.75 0 0 1-1.5 0V9a.25.25 0 0 0-.25-.25h-1a.75.75 0 0 1 0-1.5h1a.25.25 0 0 0 .25-.25V6a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHospitalFill;
