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
const SvgHearingLoop = forwardRef<
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
          d="M10.729 2.269c-3.905-.601-7.427 2.42-7.427 6.372a.75.75 0 1 0 1.5 0A4.947 4.947 0 0 1 10.5 3.75a4.91 4.91 0 0 1 3.09 1.773.75.75 0 1 0 1.166-.943 6.41 6.41 0 0 0-4.028-2.312M6.302 9.232a3.417 3.417 0 0 1 5.993-2.246.75.75 0 0 1-1.131.985 1.917 1.917 0 0 0-3.362 1.261v1.122q.28.08.533.214a.75.75 0 1 1-.7 1.326 1.24 1.24 0 0 0-.583-.144.75.75 0 0 1-.75-.75zm8.779 1.47a.75.75 0 0 1 .508.93l-1.852 6.295a5.326 5.326 0 0 1-8.085 2.915.75.75 0 0 1 .84-1.243 3.826 3.826 0 0 0 5.807-2.095l1.85-6.295a.75.75 0 0 1 .932-.508m3.2-6.232a.75.75 0 0 1 0 1.06l-15 15a.75.75 0 1 1-1.061-1.06l15-15a.75.75 0 0 1 1.06 0M15.25 16a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-1.25V21a.75.75 0 0 1-1.5 0v-4.25H16a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHearingLoop;
