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
const SvgEnvelopeClosed = forwardRef<
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
          d="M3 5.25a.75.75 0 0 0-.75.75v13c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75zm.75 11.94 5.273-5.273L3.75 8.4zm6.546-4.425L4.81 18.25h14.378l-5.485-5.485-1.288.859a.75.75 0 0 1-.832 0zm4.681-.848L20.25 8.4v8.788zm-11-5.167L12 12.099l8.023-5.349z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEnvelopeClosed;
