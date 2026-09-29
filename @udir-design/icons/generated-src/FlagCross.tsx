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
const SvgFlagCross = forwardRef<
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
          d="M2.25 5A.75.75 0 0 1 3 4.25h18a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75zm6.5 9a.75.75 0 0 0-.75-.75H3.75v-2.5H8a.75.75 0 0 0 .75-.75V5.75h2.5V10c0 .414.336.75.75.75h8.25v2.5H12a.75.75 0 0 0-.75.75v4.25h-2.5zm-5-8.25v3.5h3.5v-3.5zm0 9v3.5h3.5v-3.5zm9 0h7.5v3.5h-7.5zm7.5-5.5v-3.5h-7.5v3.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFlagCross;
