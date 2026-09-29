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
const SvgFigureOutward = forwardRef<
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
          d="M10.75 5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M12 2.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5M9.97 9.916a.25.25 0 0 1 .235-.166h3.59c.106 0 .2.066.236.166l1.905 5.334H13.5a.75.75 0 0 0-.75.75v5a.75.75 0 0 0 1.5 0v-4.25H17a.75.75 0 0 0 .706-1.002L15.443 9.41a1.75 1.75 0 0 0-1.648-1.161h-3.59c-.74 0-1.4.465-1.648 1.161l-2.263 6.337A.75.75 0 0 0 7 16.75h2.75V21a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-.75-.75H8.064z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFigureOutward;
