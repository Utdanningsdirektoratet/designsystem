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
const SvgMonitorFill = forwardRef<
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
          d="M2.25 4.5c0-.69.56-1.25 1.25-1.25h17c.69 0 1.25.56 1.25 1.25v11c0 .69-.56 1.25-1.25 1.25h-7.75v2.5H19a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5h5.25v-2.5H3.5c-.69 0-1.25-.56-1.25-1.25z"
        />
      </svg>
    );
  },
);
export default SvgMonitorFill;
