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
const SvgTagFill = forwardRef<
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
          d="M14.324 3.75c-.73 0-1.429.29-1.944.805l-8.207 8.208a1.75 1.75 0 0 0 0 2.474l4.585 4.586a1.75 1.75 0 0 0 2.475 0l8.207-8.207a2.75 2.75 0 0 0 .806-1.944V5.5a1.75 1.75 0 0 0-1.75-1.75zM15.496 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTagFill;
