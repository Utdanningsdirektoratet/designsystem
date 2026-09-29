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
const SvgImage = forwardRef<
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
          d="M4 5.75a.25.25 0 0 0-.25.25v12c0 .138.112.25.25.25h5.599l3.777-5.666a.75.75 0 0 1 1.248 0l3.777 5.666H20a.25.25 0 0 0 .25-.25V6a.25.25 0 0 0-.25-.25zm12.599 12.5L14 14.352l-2.599 3.898zM2.25 6c0-.966.784-1.75 1.75-1.75h16c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0 1 20 19.75H4A1.75 1.75 0 0 1 2.25 18zM8 8.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M5.25 10a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgImage;
