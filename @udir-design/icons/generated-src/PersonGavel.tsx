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
const SvgPersonGavel = forwardRef<
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
          d="M12 3.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M6.75 7.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0M12 15.75A5.25 5.25 0 0 0 6.75 21a.75.75 0 0 1-1.5 0A6.75 6.75 0 0 1 12 14.25a.75.75 0 0 1 0 1.5m4.47-1.78a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-2 2a.75.75 0 0 1-1.06 0L17 19.56l-2.47 2.47a.75.75 0 1 1-1.06-1.06l2.47-2.47-1.47-1.47a.75.75 0 0 1 0-1.06zm3.47 4.53-.94.94-2.94-2.94.94-.94z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonGavel;
