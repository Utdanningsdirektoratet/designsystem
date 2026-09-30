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
const SvgSpoonFill = forwardRef<
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
          d="M12 3.25c-.97 0-1.605.7-1.985 1.428-.387.741-.626 1.71-.757 2.712-.134.814-.15 1.841.204 2.707.183.447.474.871.916 1.181q.388.271.872.388V20a.75.75 0 0 0 1.5 0v-8.334a2.5 2.5 0 0 0 .872-.388c.442-.31.733-.734.916-1.181.354-.865.338-1.891.204-2.705-.13-1.035-.369-2.006-.759-2.743C13.596 3.917 12.957 3.25 12 3.25"
        />
      </svg>
    );
  },
);
export default SvgSpoonFill;
