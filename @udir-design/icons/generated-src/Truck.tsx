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
const SvgTruck = forwardRef<
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
          d="M3.5 4.25c-.69 0-1.25.56-1.25 1.25v11c0 .69.56 1.25 1.25 1.25h1.25a2.5 2.5 0 0 0 5 0h5a2.5 2.5 0 0 0 5 0h.75c.69 0 1.25-.56 1.25-1.25v-3.644l-1.928-4.82a1.25 1.25 0 0 0-1.16-.786H15.75V5.5c0-.69-.56-1.25-1.25-1.25zm3.75 11c.818 0 1.544.393 2 1h5V5.75H3.75v10.5h1.5c.456-.607 1.182-1 2-1m10 0a2.5 2.5 0 0 0-1.5.5v-7h2.742l1.758 4.394v3.106h-1a2.5 2.5 0 0 0-2-1m0 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-11 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTruck;
