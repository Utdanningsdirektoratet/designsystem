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
const SvgTrendDown = forwardRef<
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
          d="m14 11.06 4.422 4.422h-1.654a.75.75 0 0 0 0 1.5h3.535a.75.75 0 0 0 .75-.75v-3.535a.75.75 0 1 0-1.5 0v1.796L14.53 9.47a.75.75 0 0 0-1.06 0L10 12.94 4.53 7.47a.75.75 0 0 0-1.06 1.06l6 6a.75.75 0 0 0 1.06 0z"
        />
      </svg>
    );
  },
);
export default SvgTrendDown;
