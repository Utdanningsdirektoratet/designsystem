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
const SvgHeartBrokenFill = forwardRef<
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
          d="M11.57 5.055a.485.485 0 0 0-.151-.566c-1.2-.918-2.382-1.364-3.544-1.364-1.52 0-2.824.763-3.906 1.845-2.372 2.372-2.206 6.354 1 9.56l5.52 5.52a.5.5 0 0 0 .835-.22L13 13.79a.5.5 0 0 0-.258-.58l-3.08-1.54a.75.75 0 0 1-.36-.95zm2.142-1.295a.04.04 0 0 0-.017.019l-2.572 6.432a.5.5 0 0 0 .24.633l2.972 1.485a.75.75 0 0 1 .387.872l-1.66 5.975c-.137.495.472.85.835.487l5.133-5.133c3.206-3.206 3.373-7.188 1-9.56-1.082-1.082-2.386-1.845-3.905-1.845q-1.193-.002-2.413.635"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHeartBrokenFill;
