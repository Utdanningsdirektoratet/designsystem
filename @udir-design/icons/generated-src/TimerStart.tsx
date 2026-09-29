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
const SvgTimerStart = forwardRef<
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
          d="M10 1.25a.75.75 0 0 0 0 1.5h1.25v1.532a8.75 8.75 0 1 0 1.5 0V2.75H14a.75.75 0 0 0 0-1.5zM4.75 13a7.25 7.25 0 1 1 14.5 0 7.25 7.25 0 0 1-14.5 0m13.083-9.723a.75.75 0 0 1 1.061 0l2.829 2.829a.75.75 0 0 1-1.061 1.06l-2.829-2.828a.75.75 0 0 1 0-1.06M10.12 9.854a.75.75 0 0 1 .744-.01l4.5 2.5a.75.75 0 0 1 0 1.312l-4.5 2.5A.75.75 0 0 1 9.75 15.5v-5a.75.75 0 0 1 .37-.646m1.13 4.371L13.456 13l-2.206-1.225z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTimerStart;
