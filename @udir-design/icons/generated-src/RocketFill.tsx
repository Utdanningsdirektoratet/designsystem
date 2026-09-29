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
const SvgRocketFill = forwardRef<
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
          d="M12.97 5.97a7.82 7.82 0 0 1 6.636-2.213.75.75 0 0 1 .636.637 7.82 7.82 0 0 1-2.212 6.636l-1.707 1.707a.25.25 0 0 0-.073.177V17.5a.75.75 0 0 1-.22.53l-3 3a.75.75 0 0 1-1.265-.383l-.716-3.578a5 5 0 0 0-.152-.584.26.26 0 0 1 .061-.261l2.633-2.633a2.25 2.25 0 1 0-3.182-3.182l-2.633 2.633a.26.26 0 0 1-.261.06 5 5 0 0 0-.584-.151l-3.578-.716a.75.75 0 0 1-.383-1.265l3-3a.75.75 0 0 1 .53-.22h4.586a.25.25 0 0 0 .177-.073zm-.44 6.56a.75.75 0 1 0-1.06-1.06l-4 4a.75.75 0 1 0 1.06 1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRocketFill;
