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
const SvgSpaceHorizontal = forwardRef<
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
          d="M4 4a.75.75 0 0 1 .75.75v6.5h2a.75.75 0 0 1 0 1.5h-2v6.5a.75.75 0 0 1-1.5 0V4.75A.75.75 0 0 1 4 4m5.25 7.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zm3.25.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75m4.75-.75a.75.75 0 0 0 0 1.5h2v6.5a.75.75 0 0 0 1.5 0V4.75a.75.75 0 0 0-1.5 0v6.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSpaceHorizontal;
