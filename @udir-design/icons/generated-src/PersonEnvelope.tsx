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
const SvgPersonEnvelope = forwardRef<
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
          d="M12 3.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5M6.75 7.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0M12 15.75A5.25 5.25 0 0 0 6.75 21a.75.75 0 0 1-1.5 0 6.75 6.75 0 0 1 7.313-6.726.75.75 0 0 1-.126 1.494A5 5 0 0 0 12 15.75m4.584-1.374a.75.75 0 0 1 .832 0l3 2a.75.75 0 0 1 .334.624v4a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 .334-.624zm-1.834 3.838 1.915.957a.75.75 0 0 0 .67 0l1.915-.957v2.036h-4.5zM17 15.9l1.509 1.006-1.509.755-1.509-.755z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonEnvelope;
