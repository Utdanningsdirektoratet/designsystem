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
const SvgKroner = forwardRef<
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
          d="M10.95 7.4a.75.75 0 0 1 .15 1.05L8.438 12l2.662 3.55a.75.75 0 1 1-1.2.9l-2.65-3.533V16a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 1.5 0v3.083L9.9 7.55a.75.75 0 0 1 1.05-.15m1.8.6a.75.75 0 0 1 .75-.75H16a2.75 2.75 0 0 1 1.1 5.272l1.57 3.143a.75.75 0 1 1-1.34.67l-1.793-3.585H14.25V16a.75.75 0 0 1-1.5 0zm4.5 2a1.25 1.25 0 0 1-1.266 1.25H14.25v-2.5H16c.69 0 1.25.56 1.25 1.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgKroner;
