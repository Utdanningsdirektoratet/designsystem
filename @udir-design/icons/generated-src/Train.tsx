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
const SvgTrain = forwardRef<
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
          d="M2.25 6A.75.75 0 0 1 3 5.25h10.8c3.935 0 7.2 2.858 7.838 6.611l.003.02.001.008q.107.641.108 1.311a2.55 2.55 0 0 1-2.55 2.55H3a.75.75 0 0 1-.75-.75zm10 6c0 .414.336.75.75.75h7.235q.015.223.015.45c0 .58-.47 1.05-1.05 1.05H3.75v-7.5h8.5zm7.7-.75a6.45 6.45 0 0 0-6.15-4.5h-.05v4.5zM3 17.25a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTrain;
