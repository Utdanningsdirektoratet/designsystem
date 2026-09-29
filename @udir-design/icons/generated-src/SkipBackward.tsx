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
const SvgSkipBackward = forwardRef<
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
          d="M4 6.25a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-1.5 0V7A.75.75 0 0 1 4 6.25m9.343.083A.75.75 0 0 1 13.75 7v2a.75.75 0 0 1-1.5 0v-.543L7.29 12l4.96 3.543V15a.75.75 0 0 1 1.5 0v2a.75.75 0 0 1-1.186.61l-7-5a.75.75 0 0 1 0-1.22l7-5a.75.75 0 0 1 .78-.057M20.75 7a.75.75 0 0 0-1.186-.61l-7 5a.75.75 0 0 0 0 1.22l7 5A.75.75 0 0 0 20.75 17zm-1.5 8.543L14.29 12l4.96-3.543z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSkipBackward;
