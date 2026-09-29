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
const SvgShrink = forwardRef<
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
          d="M19.5 11.25a.75.75 0 0 0 0-1.5h-4.19l4.72-4.72a.75.75 0 1 0-1.06-1.06l-4.72 4.72V4.5a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75zM10.5 20.25a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75h-6a.75.75 0 0 0 0 1.5h4.19l-4.72 4.72a.75.75 0 0 0 1.06 1.06l4.72-4.72v4.19c0 .414.336.75.75.75"
        />
      </svg>
    );
  },
);
export default SvgShrink;
