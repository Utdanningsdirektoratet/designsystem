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
const SvgRulersFill = forwardRef<
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
          d="M7.81 3.706a.75.75 0 0 1 .69-.456H20a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.291.519l-11.5-12a.75.75 0 0 1-.149-.813m7.497 3.257A.75.75 0 0 1 16 6.5h.75a.75.75 0 0 1 .75.75V8a.75.75 0 0 1-1.28.53l-.75-.75a.75.75 0 0 1-.163-.817M5.97 5.97a.75.75 0 0 1 1.06 0l11 11a.75.75 0 0 1 0 1.06l-2.793 2.793a1.75 1.75 0 0 1-2.475 0l-9.585-9.586a1.75 1.75 0 0 1 0-2.474zm2.646 3.707a.25.25 0 0 0-.354 0l-.792.793a.75.75 0 0 0 1.06 1.06l.793-.793a.25.25 0 0 0 0-.353zm2.5 2.5a.25.25 0 0 0-.354 0l-.792.793a.75.75 0 0 0 1.06 1.06l.793-.793a.25.25 0 0 0 0-.353zm2.5 2.5a.25.25 0 0 0-.354 0l-.792.793a.75.75 0 0 0 1.06 1.06l.793-.793a.25.25 0 0 0 0-.353z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRulersFill;
