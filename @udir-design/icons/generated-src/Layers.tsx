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
const SvgLayers = forwardRef<
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
          d="M12.425 4.382a.75.75 0 0 0-.85 0l-8 5.5a.75.75 0 0 0 0 1.236l8 5.5a.75.75 0 0 0 .85 0l8-5.5a.75.75 0 0 0 0-1.236zM12 15.09 5.324 10.5 12 5.91l6.676 4.59zm-7.575-2.208a.75.75 0 0 0-.85 1.236l8 5.5a.75.75 0 0 0 .85 0l8-5.5a.75.75 0 0 0-.85-1.236L12 18.09z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLayers;
