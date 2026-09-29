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
const SvgBrailleFill = forwardRef<
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
          d="M5.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m0 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M12 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M15.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m-2.149 3.25c-1.112 0-1.998.91-1.998 2.013v2.909a1.89 1.89 0 0 0-2.55.128 1.92 1.92 0 0 0-.237 2.405l2.443 3.708a.75.75 0 0 0 .626.337h6.423a.75.75 0 0 0 .719-.537l.858-2.895c.457-1.543-.494-3.164-2.076-3.484l-2.21-.447v-2.124a2.006 2.006 0 0 0-1.998-2.013"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBrailleFill;
