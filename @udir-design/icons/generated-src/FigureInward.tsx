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
const SvgFigureInward = forwardRef<
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
          d="M10.75 5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M12 2.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5m-3.094 7.785a.25.25 0 0 1 .247-.285h5.694a.25.25 0 0 1 .248.285l-.745 5.215h-.85a.75.75 0 0 0-.75.75v5a.75.75 0 0 0 1.5 0v-4.25H15a.75.75 0 0 0 .742-.644l.837-5.859a1.75 1.75 0 0 0-1.732-1.997H9.153a1.75 1.75 0 0 0-1.732 1.998l.837 5.858A.75.75 0 0 0 9 16.75h.75V21a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-.75-.75h-.85z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFigureInward;
