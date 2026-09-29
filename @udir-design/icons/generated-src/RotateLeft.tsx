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
const SvgRotateLeft = forwardRef<
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
          d="M14.03 2.97a.75.75 0 0 1 0 1.06l-1.22 1.22H17A3.75 3.75 0 0 1 20.75 9v4.5a.75.75 0 0 1-1.5 0V9A2.25 2.25 0 0 0 17 6.75h-4.19l1.22 1.22a.75.75 0 0 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 0M5 11.25A1.75 1.75 0 0 0 3.25 13v6c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 12.75 19v-6A1.75 1.75 0 0 0 11 11.25zM4.75 13a.25.25 0 0 1 .25-.25h6a.25.25 0 0 1 .25.25v6a.25.25 0 0 1-.25.25H5a.25.25 0 0 1-.25-.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRotateLeft;
