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
const SvgVirus = forwardRef<
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
          d="M9.75 2.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-.75v1.036a7.7 7.7 0 0 1 4.117 1.683l.863-.863-.265-.266a.75.75 0 1 1 1.06-1.06l1.592 1.59a.75.75 0 0 1-1.06 1.061l-.266-.265-.853.853a7.7 7.7 0 0 1 1.776 4.231h1.036v-.75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0v-.75h-1.036a7.7 7.7 0 0 1-1.618 4.036l.695.694.265-.265a.75.75 0 0 1 1.06 1.06l-1.59 1.592a.75.75 0 0 1-1.06-1.061l.264-.265-.67-.67a7.7 7.7 0 0 1-4.31 1.843v1.036h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75v-1.036a7.7 7.7 0 0 1-4.23-1.776l-.603.603.265.265a.75.75 0 1 1-1.061 1.06l-1.591-1.59a.75.75 0 1 1 1.06-1.061l.266.265.613-.613a7.7 7.7 0 0 1-1.683-4.117H3.25v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0v.75h1.036a7.7 7.7 0 0 1 1.843-4.31l-.773-.773-.265.265A.75.75 0 1 1 4.03 5.37L5.621 3.78a.75.75 0 0 1 1.06 1.06l-.265.266.798.798a7.7 7.7 0 0 1 4.036-1.618V3.25h-.75a.75.75 0 0 1-.75-.75M12 5.75a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5M8.75 11a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0m.75-2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M15 9a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-3.5 6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgVirus;
