import {
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
const SvgPushPinFill = forwardRef<
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
          d="M16.312 3.251a1.75 1.75 0 0 0-2.592.13l-3.584 4.38a.25.25 0 0 1-.137.085l-4.41 1.018c-1.339.309-1.815 1.97-.844 2.942l7.449 7.449c.972.972 2.633.495 2.942-.844L16.154 14a.25.25 0 0 1 .085-.137l4.38-3.584a1.75 1.75 0 0 0 .13-2.592zM4.53 20.531 8.06 17 7 15.94l-3.53 3.53a.75.75 0 1 0 1.06 1.06"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPushPinFill;
