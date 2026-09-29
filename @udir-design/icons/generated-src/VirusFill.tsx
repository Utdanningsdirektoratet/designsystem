import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  /**
   * @deprecated Use `aria-label` for an accessible name, and the `Tooltip` component from `@udir-design/react` for a tooltip. Will be removed in the next major version.
   */
  title?: string;
  /**
   * @deprecated Only used by the deprecated `title` prop. Will be removed in the next major version.
   */
  titleId?: string;
}
const SvgVirusFill = forwardRef<
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
          d="M9.75 2.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-.75v1.036a7.7 7.7 0 0 1 4.118 1.683l.863-.863-.267-.266a.75.75 0 1 1 1.061-1.06l1.591 1.59a.75.75 0 0 1-1.06 1.061l-.265-.264-.853.853a7.7 7.7 0 0 1 1.776 4.23h1.036v-.75a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-1.5 0v-.75h-1.036a7.7 7.7 0 0 1-1.617 4.035l.694.694.265-.264a.75.75 0 0 1 1.06 1.06l-1.59 1.592a.75.75 0 0 1-1.061-1.061l.266-.266-.67-.67a7.7 7.7 0 0 1-4.311 1.844v1.036h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75v-1.036a7.7 7.7 0 0 1-4.23-1.776l-.603.602.266.266a.75.75 0 1 1-1.061 1.06l-1.591-1.59a.75.75 0 1 1 1.06-1.061l.265.265.613-.613a7.7 7.7 0 0 1-1.683-4.117H3.25v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0v.75h1.036A7.7 7.7 0 0 1 6.13 6.94l-.773-.773-.265.265A.75.75 0 1 1 4.03 5.37L5.622 3.78a.75.75 0 0 1 1.06 1.06l-.265.266.798.797a7.7 7.7 0 0 1 4.035-1.617V3.25h-.75a.75.75 0 0 1-.75-.75m-1 8.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0m.75-2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M14 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0m-1 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgVirusFill;
