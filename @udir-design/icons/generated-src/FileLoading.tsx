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
const SvgFileLoading = forwardRef<
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
          d="M5.25 4.5c0-.69.56-1.25 1.25-1.25H14a.75.75 0 0 1 .53.22l4 4c.141.14.22.331.22.53v11.5c0 .69-.56 1.25-1.25 1.25h-11c-.69 0-1.25-.56-1.25-1.25zm9.25 4.25c-.69 0-1.25-.56-1.25-1.25V4.75h-6.5v14.5h10.5V8.75zm.25-2.94 1.44 1.44h-1.44zm-5 8.19a2.25 2.25 0 0 1 4.5 0 .75.75 0 0 0 1.5 0A3.751 3.751 0 1 0 12 17.75a.75.75 0 0 0 0-1.5A2.25 2.25 0 0 1 9.75 14"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileLoading;
