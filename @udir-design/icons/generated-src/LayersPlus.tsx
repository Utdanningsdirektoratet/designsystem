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
const SvgLayersPlus = forwardRef<
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
          d="M11.575 4.382a.75.75 0 0 1 .85 0l8 5.5a.75.75 0 0 1 0 1.236l-8 5.5a.75.75 0 0 1-.85 0l-8-5.5a.75.75 0 0 1 0-1.236zM5.324 10.5 12 15.09l6.676-4.59L12 5.91zm-1.942 2.575a.75.75 0 0 1 1.043-.193L12 18.09l7.575-5.208a.75.75 0 0 1 .85 1.236l-8 5.5a.75.75 0 0 1-.85 0l-8-5.5a.75.75 0 0 1-.193-1.043M12 7.75a.75.75 0 0 1 .75.75v1.25h1.75a.75.75 0 0 1 0 1.5h-1.75v1.25a.75.75 0 0 1-1.5 0v-1.25H9.5a.75.75 0 0 1 0-1.5h1.75V8.5a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLayersPlus;
