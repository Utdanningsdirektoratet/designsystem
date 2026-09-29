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
const SvgSquareGrid = forwardRef<
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
          d="M10 13.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 .75-.75zm10 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 .75-.75zm-15.25 6h4.5v-4.5h-4.5zm10 0h4.5v-4.5h-4.5zM10 3.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75V4A.75.75 0 0 1 4 3.25zm10 0a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75V4a.75.75 0 0 1 .75-.75zm-15.25 6h4.5v-4.5h-4.5zm10 0h4.5v-4.5h-4.5z"
        />
      </svg>
    );
  },
);
export default SvgSquareGrid;
