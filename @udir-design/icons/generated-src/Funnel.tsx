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
const SvgFunnel = forwardRef<
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
          d="M2.326 3.67A.75.75 0 0 1 3 3.25h18a.75.75 0 0 1 .592 1.21l-6.842 8.797V19a.75.75 0 0 1-.415.67l-4 2A.75.75 0 0 1 9.25 21v-7.743L2.408 4.46a.75.75 0 0 1-.082-.79m2.207 1.08 6.217 7.993v7.044l2.5-1.25v-5.794l6.217-7.993z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFunnel;
