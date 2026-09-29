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
const SvgTasklistSendFill = forwardRef<
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
          d="M4.25 3.5c0-.69.56-1.25 1.25-1.25h13c.69 0 1.25.56 1.25 1.25v10.998a.25.25 0 0 1-.352.228l-8.484-3.782a2.25 2.25 0 0 0-3.02 2.846l1.17 3.122a.25.25 0 0 1 0 .176l-1.17 3.122a2.25 2.25 0 0 0-.106 1.199c.03.17-.09.341-.263.341H5.5c-.69 0-1.25-.56-1.25-1.25zM12.37 7a.75.75 0 0 1 .75-.75h2.5a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75m-1.27-.8a.75.75 0 1 0-1.2-.9l-.808 1.078a.25.25 0 0 1-.377.026L8.53 6.22a.75.75 0 0 0-1.06 1.06l1 1A.75.75 0 0 0 9.6 8.2zm-1.614 6.254a.75.75 0 0 1 .819-.14l9 4a.75.75 0 0 1 0 1.371l-9 4a.75.75 0 0 1-1.007-.948l1.059-2.825a.25.25 0 0 1 .234-.162H13.5a.75.75 0 0 0 0-1.5h-2.909a.25.25 0 0 1-.234-.162l-1.06-2.825a.75.75 0 0 1 .189-.809"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTasklistSendFill;
