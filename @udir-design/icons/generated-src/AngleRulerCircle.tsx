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
const SvgAngleRulerCircle = forwardRef<
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
          d="M8.269 6.992A9.75 9.75 0 0 1 21.75 16a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75 9.75 9.75 0 0 1 6.019-9.008m9.822 8.258V14a.75.75 0 1 0-1.5 0v1.25h-2.06V14a.75.75 0 0 0-1.5 0v1.25H10.97V14a.75.75 0 0 0-1.5 0v1.25H7.41V14a.75.75 0 1 0-1.5 0v1.25H3.783a8.25 8.25 0 0 1 16.432 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAngleRulerCircle;
