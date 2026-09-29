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
const SvgEraserFill = forwardRef<
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
          d="M15.005 3.338a.75.75 0 0 0-1.06 0L6.342 10.94a.5.5 0 0 0 0 .707l.176.175 5.655 5.656.184.18a.5.5 0 0 0 .704-.003l7.6-7.6a.75.75 0 0 0 0-1.06zm-3.71 16.085a.5.5 0 0 0-.004-.71l-.175-.172-5.835-5.833a.5.5 0 0 0-.707 0l-.53.53a1.75 1.75 0 0 0 0 2.474l4.243 4.243a1.75 1.75 0 0 0 2.475 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEraserFill;
