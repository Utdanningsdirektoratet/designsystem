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
const SvgBowl = forwardRef<
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
          d="M4 7.25a.75.75 0 0 0-.75.75v3a6.75 6.75 0 0 0 4.5 6.366V18c0 .414.336.75.75.75h7a.75.75 0 0 0 .75-.75v-.634A6.75 6.75 0 0 0 20.75 11V8a.75.75 0 0 0-.75-.75zm6 9A5.25 5.25 0 0 1 4.75 11V8.75h14.5V11c0 2.9-2.35 5.25-5.25 5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBowl;
