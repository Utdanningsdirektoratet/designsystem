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
const SvgMeetingLarge = forwardRef<
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
          d="M6 4.75a1.25 1.25 0 0 0-1.21.937.75.75 0 0 1-1.453-.374 2.75 2.75 0 0 1 5.326 0 .75.75 0 0 1-1.452.374A1.25 1.25 0 0 0 6 4.75M2.25 8A.75.75 0 0 1 3 7.25h18a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75zm1.5.75v6.5h16.5v-6.5zm7.04-3.063a1.25 1.25 0 0 1 2.42 0 .75.75 0 0 0 1.453-.374 2.75 2.75 0 0 0-5.326 0 .75.75 0 1 0 1.452.374M18 4.75a1.25 1.25 0 0 0-1.21.937.75.75 0 1 1-1.453-.374 2.75 2.75 0 0 1 5.326 0 .75.75 0 1 1-1.452.374A1.25 1.25 0 0 0 18 4.75M4.79 18.313a.75.75 0 1 0-1.453.374 2.75 2.75 0 0 0 5.326 0 .75.75 0 1 0-1.452-.374 1.25 1.25 0 0 1-2.422 0m5.086-.54a.75.75 0 0 1 .913.54 1.251 1.251 0 0 0 2.422 0 .75.75 0 0 1 1.452.374 2.75 2.75 0 0 1-5.326 0 .75.75 0 0 1 .539-.913m6.913.54a.75.75 0 1 0-1.452.374 2.75 2.75 0 0 0 5.326 0 .75.75 0 1 0-1.452-.374 1.25 1.25 0 0 1-2.422 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMeetingLarge;
