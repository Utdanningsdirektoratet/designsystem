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
const SvgBellFill = forwardRef<
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
          d="M12.75 2.5a.75.75 0 0 0-1.5 0v1.273c-2.222.14-3.655.92-4.499 2.186-.887 1.33-1.001 3.04-1.001 4.541v3c0 .809-.424 1.92-.92 2.915a18 18 0 0 1-.936 1.641l-.014.022-.004.006A.75.75 0 0 0 4.5 19.25h4.338a3.25 3.25 0 0 0 6.324 0H19.5a.75.75 0 0 0 .624-1.166l-.004-.006-.014-.022-.06-.091c-.05-.081-.125-.2-.215-.35-.18-.301-.42-.722-.66-1.2-.497-.994-.921-2.106-.921-2.915v-3c0-1.501-.114-3.21-1.001-4.541-.844-1.266-2.277-2.046-4.499-2.186zm-1.987 17.237a1.8 1.8 0 0 1-.344-.487h3.162a1.75 1.75 0 0 1-1.581 1 1.75 1.75 0 0 1-1.237-.513"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBellFill;
