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
const SvgLineGraphDot = forwardRef<
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
          d="M20 6.5a1.5 1.5 0 0 0-1.45 1.889L14.39 12.55a1.5 1.5 0 0 0-.777 0l-2.163-2.162A1.503 1.503 0 0 0 10 8.5a1.5 1.5 0 0 0-1.45 1.889L4.39 14.55a1.5 1.5 0 1 0 1.06 1.06l4.162-4.162a1.5 1.5 0 0 0 .777 0l2.163 2.162A1.503 1.503 0 0 0 14 15.5a1.5 1.5 0 0 0 1.45-1.889l4.162-4.162A1.5 1.5 0 0 0 21.5 8 1.5 1.5 0 0 0 20 6.5"
        />
      </svg>
    );
  },
);
export default SvgLineGraphDot;
