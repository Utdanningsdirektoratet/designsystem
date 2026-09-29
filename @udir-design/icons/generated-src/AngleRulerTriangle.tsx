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
const SvgAngleRulerTriangle = forwardRef<
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
          d="M4 3.25a.75.75 0 0 0-.53 1.28l16 16a.75.75 0 0 0 1.28-.53V4a.75.75 0 0 0-.75-.75zm15.25 14.94L5.81 4.75h13.44zM14.333 7.582a.75.75 0 0 0-.53 1.28l1 1a.75.75 0 0 0 1.28-.53v-1a.75.75 0 0 0-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAngleRulerTriangle;
