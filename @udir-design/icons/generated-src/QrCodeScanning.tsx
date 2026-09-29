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
const SvgQrCodeScanning = forwardRef<
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
          d="M19.25 4.75V8a.75.75 0 0 0 1.5 0V4a.75.75 0 0 0-.75-.75h-4a.75.75 0 0 0 0 1.5zM4.75 16v3.25H8a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0m14.5 0v3.25H16a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 0-1.5 0M4.75 8V4.75H8a.75.75 0 0 0 0-1.5H4a.75.75 0 0 0-.75.75v4a.75.75 0 0 0 1.5 0m1-1.5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1-.75-.75zm1.5.75v2.5h2.5v-2.5zm6.25-1.5a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75h4a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 0-.75-.75zm.75 4v-2.5h2.5v2.5zm-8.5 3.75a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1-.75-.75zm1.5.75v2.5h2.5v-2.5zm6.25-1.5a.75.75 0 0 0-.75.75v1c0 .414.336.75.75.75h1a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75zm-.75 3.75a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1-.75-.75zm3.75-3.75a.75.75 0 0 0-.75.75v1c0 .414.336.75.75.75h1a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgQrCodeScanning;
