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
const SvgStaircase = forwardRef<
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
          d="M16.25 6a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-3.25V10a.75.75 0 0 1-.75.75h-4.25V14a.75.75 0 0 1-.75.75H7.75V18a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h3.25V14a.75.75 0 0 1 .75-.75h4.25V10a.75.75 0 0 1 .75-.75h4.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgStaircase;
