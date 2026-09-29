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
const SvgFigureChildFill = forwardRef<
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
          d="M12 6.25a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5m-2.5 7a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75h.75V21a.75.75 0 0 0 1.5 0v-2.25h.5V21a.75.75 0 0 0 1.5 0v-2.25h.75a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 0-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFigureChildFill;
