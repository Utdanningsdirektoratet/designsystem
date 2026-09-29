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
const SvgNumberList = forwardRef<
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
          d="M5.25 5a.75.75 0 0 0-1.166-.624l-1.5 1a.75.75 0 1 0 .832 1.248l.334-.223V9.75H3a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-.75zm-.75 9.25a.75.75 0 0 0-.75.75.75.75 0 0 1-1.5 0 2.25 2.25 0 0 1 2.25-2.25h.04a2.21 2.21 0 0 1 1.678 3.648L4.631 18.25H6a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.57-1.238l2.65-3.09a.71.71 0 0 0-.54-1.172zm4.5 3a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgNumberList;
