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
const SvgQuestionmark = forwardRef<
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
          d="M9.75 9A2.25 2.25 0 0 1 12 6.75h.172a2.078 2.078 0 0 1 1.47 3.548l-1 1a4.75 4.75 0 0 0-1.392 3.359.75.75 0 0 0 1.5 0c0-.862.342-1.689.952-2.298l1-1a3.579 3.579 0 0 0-2.53-6.109H12A3.75 3.75 0 0 0 8.25 9v.5a.75.75 0 0 0 1.5 0zM12 16.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgQuestionmark;
