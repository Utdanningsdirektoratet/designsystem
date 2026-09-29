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
const SvgImageFill = forwardRef<
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
          d="M2.25 6c0-.966.784-1.75 1.75-1.75h16c.966 0 1.75.784 1.75 1.75v12A1.75 1.75 0 0 1 20 19.75H4A1.75 1.75 0 0 1 2.25 18zM8 8.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M5.25 10a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0m12.892 7.861a.25.25 0 0 1-.208.389h-1.202a.25.25 0 0 1-.208-.111l-2.316-3.475a.25.25 0 0 0-.416 0l-2.316 3.475a.25.25 0 0 1-.209.111h-1.201a.25.25 0 0 1-.208-.389l3.518-5.277a.75.75 0 0 1 1.248 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgImageFill;
