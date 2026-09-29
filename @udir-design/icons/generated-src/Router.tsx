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
const SvgRouter = forwardRef<
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
          d="M6.165 6.168A8.22 8.22 0 0 1 12 3.75c2.28 0 4.342.923 5.836 2.418a.75.75 0 0 0 1.06-1.06A9.72 9.72 0 0 0 12 2.25a9.72 9.72 0 0 0-6.896 2.858.75.75 0 1 0 1.06 1.06M12 7.75a4.23 4.23 0 0 0-3.007 1.246.75.75 0 1 1-1.06-1.06A5.73 5.73 0 0 1 12 6.25c1.588 0 3.028.645 4.067 1.686a.75.75 0 0 1-1.06 1.06A4.24 4.24 0 0 0 12 7.75M14.25 12c0 .98-.626 1.813-1.5 2.122v5.128H16a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1 0-1.5h3.25v-5.128a2.251 2.251 0 1 1 3-2.122M12 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRouter;
