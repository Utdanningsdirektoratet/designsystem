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
const SvgBroadcastPlusCircle = forwardRef<
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
          d="M5 3.25a.75.75 0 0 0 0 1.5 14.2 14.2 0 0 1 9.15 3.325.75.75 0 0 0 .963-1.15A15.7 15.7 0 0 0 5 3.25M4.25 9A.75.75 0 0 1 5 8.25c1.654 0 3.222.374 4.623 1.042a.75.75 0 1 1-.646 1.354A9.2 9.2 0 0 0 5 9.75.75.75 0 0 1 4.25 9m6.5 6a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0M15 9.25a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5m0 2.5a.75.75 0 0 1 .75.75v1.75h1.75a.75.75 0 0 1 0 1.5h-1.75v1.75a.75.75 0 0 1-1.5 0v-1.75H12.5a.75.75 0 0 1 0-1.5h1.75V12.5a.75.75 0 0 1 .75-.75M3.5 19a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M5 13.25a.75.75 0 0 0 0 1.5c.775 0 1.5.207 2.124.568a.75.75 0 1 0 .752-1.298A5.7 5.7 0 0 0 5 13.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBroadcastPlusCircle;
