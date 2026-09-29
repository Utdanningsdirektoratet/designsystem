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
const SvgBulletList = forwardRef<
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
          d="M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBulletList;
