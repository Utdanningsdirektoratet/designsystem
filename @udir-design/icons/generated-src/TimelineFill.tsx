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
const SvgTimelineFill = forwardRef<
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
          d="M18 3a3 3 0 0 1 3 3v12l-.004.154a3 3 0 0 1-2.842 2.842L18 21H6l-.154-.004a3 3 0 0 1-2.842-2.842L3 18V6a3 3 0 0 1 3-3zm-8 12.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5zm-3-4a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5zm3-4a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5z"
        />
      </svg>
    );
  },
);
export default SvgTimelineFill;
