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
const SvgBroadcastPlusCircleFill = forwardRef<
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
          d="M4.25 4A.75.75 0 0 1 5 3.25a15.7 15.7 0 0 1 10.113 3.675.75.75 0 0 1-.964 1.15A14.2 14.2 0 0 0 5 4.75.75.75 0 0 1 4.25 4M5 8.25a.75.75 0 0 0 0 1.5c1.425 0 2.773.322 3.977.896a.75.75 0 1 0 .646-1.354A10.7 10.7 0 0 0 5 8.25M4.25 14a.75.75 0 0 1 .75-.75c1.046 0 2.029.28 2.876.77a.75.75 0 0 1-.752 1.298A4.2 4.2 0 0 0 5 14.75a.75.75 0 0 1-.75-.75m-.75 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M15 9.25a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5m.75 3.25a.75.75 0 0 0-1.5 0v1.75H12.5a.75.75 0 0 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0v-1.75h1.75a.75.75 0 0 0 0-1.5h-1.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBroadcastPlusCircleFill;
