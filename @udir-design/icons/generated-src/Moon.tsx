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
const SvgMoon = forwardRef<
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
          d="M14.824 3.115a.75.75 0 0 1 .81-.165A9.75 9.75 0 0 1 21.75 12c0 5.385-4.365 9.75-9.75 9.75a9.75 9.75 0 0 1-9.05-6.116.75.75 0 0 1 .975-.976A8.25 8.25 0 0 0 14.658 3.925a.75.75 0 0 1 .166-.81m1.747 2.016q.177.909.179 1.869c0 5.385-4.365 9.75-9.75 9.75a10 10 0 0 1-1.87-.18A8.25 8.25 0 1 0 16.57 5.13"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMoon;
