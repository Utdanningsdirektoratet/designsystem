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
const SvgClipboardLinkFill = forwardRef<
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
          d="M9.5 2.25a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h5a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75zm-2 2a.25.25 0 0 1 .25.25v2c0 .414.336.75.75.75h7a.75.75 0 0 0 .75-.75v-2a.25.25 0 0 1 .25-.25H18a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V5A.75.75 0 0 1 6 4.25zm6.091 6.598a.25.25 0 0 1 .354 0l.707.707a.25.25 0 0 1 0 .354L12.53 14.03a.25.25 0 0 1-.353 0 .75.75 0 0 0-1.06 1.061l.353.354a1.25 1.25 0 0 0 1.767 0l2.829-2.829a1.25 1.25 0 0 0 0-1.768l-1.414-1.414a1.25 1.25 0 0 0-1.768 0l-.354.354a.75.75 0 0 0 1.061 1.06M11.47 12.97a.25.25 0 0 1 .353 0 .75.75 0 0 0 1.06-1.061l-.353-.354a1.25 1.25 0 0 0-1.767 0l-2.829 2.829a1.25 1.25 0 0 0 0 1.768l1.414 1.414a1.25 1.25 0 0 0 1.768 0l.354-.354a.75.75 0 0 0-1.061-1.06.25.25 0 0 1-.354 0l-.707-.708a.25.25 0 0 1 0-.353z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgClipboardLinkFill;
