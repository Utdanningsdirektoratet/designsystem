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
const SvgAngleRulerCircleFill = forwardRef<
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
          d="M12 6.25A9.75 9.75 0 0 0 2.25 16c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75A9.75 9.75 0 0 0 12 6.25M7.41 15a.25.25 0 0 1-.25.25h-1a.25.25 0 0 1-.25-.25v-1a.75.75 0 0 1 1.5 0zm7.12 0a.25.25 0 0 1-.25.25h-1a.25.25 0 0 1-.25-.25v-1a.75.75 0 0 1 1.5 0zm3.56 0a.25.25 0 0 1-.25.25h-1a.25.25 0 0 1-.25-.25v-1a.75.75 0 0 1 1.5 0zm-8.37.25a.25.25 0 0 1-.25-.25v-1a.75.75 0 1 1 1.5 0v1a.25.25 0 0 1-.25.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAngleRulerCircleFill;
