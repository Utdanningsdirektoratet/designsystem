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
const SvgVitals = forwardRef<
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
          d="M11.028 4.25a.75.75 0 0 1 .678.498l4.27 11.954 2.312-6.94A.75.75 0 0 1 19 9.25h2a.75.75 0 0 1 0 1.5h-1.46l-2.828 8.487a.75.75 0 0 1-1.418.015l-4.37-12.235-3.239 7.288a.75.75 0 0 1-1.356.03L4.536 10.75H3a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 .67.415l1.29 2.578 3.355-7.548a.75.75 0 0 1 .713-.444"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgVitals;
