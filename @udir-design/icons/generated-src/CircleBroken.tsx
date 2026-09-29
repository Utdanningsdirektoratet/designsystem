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
const SvgCircleBroken = forwardRef<
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
          d="M12 3.75A8.25 8.25 0 0 0 3.75 12a8.25 8.25 0 0 0 5.5 7.78c.86.304 1.784.47 2.75.47a.75.75 0 0 1 0 1.5 9.7 9.7 0 0 1-3.25-.555A9.75 9.75 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75a9.75 9.75 0 0 1 9.195 6.5A9.7 9.7 0 0 1 21.75 12a.75.75 0 0 1-1.5 0c0-.966-.166-1.89-.47-2.75A8.25 8.25 0 0 0 12 3.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCircleBroken;
