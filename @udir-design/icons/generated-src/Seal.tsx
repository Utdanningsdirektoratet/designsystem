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
const SvgSeal = forwardRef<
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
          d="M9.99 3.051a2.75 2.75 0 0 1 4.02 0l.788.844c.246.264.594.408.955.396l1.154-.04a2.75 2.75 0 0 1 2.841 2.842l-.039 1.154c-.012.36.133.709.396.955l.844.789a2.75 2.75 0 0 1 0 4.018l-.844.788a1.25 1.25 0 0 0-.396.956l.04 1.154a2.75 2.75 0 0 1-2.842 2.841l-1.154-.039a1.25 1.25 0 0 0-.955.396l-.789.844a2.75 2.75 0 0 1-4.018 0l-.789-.844a1.25 1.25 0 0 0-.955-.396l-1.154.04a2.75 2.75 0 0 1-2.841-2.842l.039-1.154a1.25 1.25 0 0 0-.396-.956l-.844-.788a2.75 2.75 0 0 1 0-4.018l.844-.789a1.25 1.25 0 0 0 .396-.955l-.04-1.154a2.75 2.75 0 0 1 2.842-2.841l1.154.039c.36.012.709-.132.955-.396zm2.923 1.024a1.25 1.25 0 0 0-1.826 0l-.789.844a2.75 2.75 0 0 1-2.102.87l-1.154-.038a1.25 1.25 0 0 0-1.291 1.291l.039 1.154a2.75 2.75 0 0 1-.87 2.102l-.844.789a1.25 1.25 0 0 0 0 1.826l.843.789a2.75 2.75 0 0 1 .87 2.102l-.038 1.154a1.25 1.25 0 0 0 1.291 1.291l1.154-.039a2.75 2.75 0 0 1 2.102.87l.789.845a1.25 1.25 0 0 0 1.826 0l.789-.844a2.75 2.75 0 0 1 2.102-.87l1.154.038a1.25 1.25 0 0 0 1.291-1.291l-.039-1.154a2.75 2.75 0 0 1 .87-2.102l.845-.789a1.25 1.25 0 0 0 0-1.826l-.844-.789a2.75 2.75 0 0 1-.87-2.102l.038-1.154a1.25 1.25 0 0 0-1.291-1.291l-1.154.039a2.75 2.75 0 0 1-2.102-.87z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSeal;
