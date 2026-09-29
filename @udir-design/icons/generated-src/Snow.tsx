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
const SvgSnow = forwardRef<
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
          d="M13.978 3.325a.75.75 0 0 1 .924.52l.274.98.584-1.037a.75.75 0 0 1 1.307.736l-.583 1.036.98-.274a.75.75 0 1 1 .404 1.445l-2.425.678-2.16 3.84h4.406l1.78-1.78a.75.75 0 1 1 1.061 1.061l-.72.72H21a.75.75 0 0 1 0 1.5h-1.19l.72.72a.75.75 0 0 1-1.06 1.06l-1.78-1.78h-4.391l2.195 3.802 2.432.651a.75.75 0 1 1-.388 1.45l-.983-.264.595 1.03a.75.75 0 0 1-1.3.75l-.594-1.03-.264.983a.75.75 0 1 1-1.448-.388l.651-2.432-2.187-3.788-2.144 3.812.678 2.424a.75.75 0 1 1-1.444.405l-.274-.98-.583 1.036a.75.75 0 0 1-1.308-.735l.584-1.037-.98.274a.75.75 0 0 1-.405-1.444l2.425-.679 2.16-3.84H6.312l-1.78 1.78a.75.75 0 1 1-1.061-1.06l.72-.72H3a.75.75 0 1 1 0-1.5h1.19l-.72-.72a.75.75 0 0 1 1.06-1.06l1.78 1.78h4.39L8.507 7.448l-2.432-.652a.75.75 0 1 1 .388-1.449l.983.263-.595-1.03a.75.75 0 1 1 1.3-.75l.594 1.03.264-.983a.75.75 0 1 1 1.449.389l-.652 2.432 2.187 3.787 2.144-3.811-.679-2.425a.75.75 0 0 1 .52-.924"
        />
      </svg>
    );
  },
);
export default SvgSnow;
