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
const SvgAlignRight = forwardRef<
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
          d="M20 20.75a.75.75 0 0 1-.75-.75V4a.75.75 0 0 1 1.5 0v16a.75.75 0 0 1-.75.75M17.75 10a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75V6A.75.75 0 0 1 4 5.25h13a.75.75 0 0 1 .75.75zm-1.5-.75v-2.5H4.75v2.5zm.75 9.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 0-.75-.75h-7a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm-.75-4v2.5h-5.5v-2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAlignRight;
