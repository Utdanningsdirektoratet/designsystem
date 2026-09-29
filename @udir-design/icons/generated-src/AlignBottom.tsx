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
const SvgAlignBottom = forwardRef<
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
          d="M6 17.75a.75.75 0 0 1-.75-.75V4A.75.75 0 0 1 6 3.25h4a.75.75 0 0 1 .75.75v13a.75.75 0 0 1-.75.75zm.75-1.5h2.5V4.75h-2.5zM3.25 20a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75m10-3c0 .414.336.75.75.75h4a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75h-4a.75.75 0 0 0-.75.75zm4-.75h-2.5v-5.5h2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAlignBottom;
