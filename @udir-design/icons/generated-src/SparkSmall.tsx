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
const SvgSparkSmall = forwardRef<
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
          d="M7.125 3.556a.75.75 0 0 1 1.025.275l3 5.196a.75.75 0 0 1-1.3.75l-3-5.196a.75.75 0 0 1 .275-1.025M3 12.75h6a.75.75 0 0 0 0-1.5H3a.75.75 0 0 0 0 1.5m18-1.5h-6a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5m-6.85 2.973a.75.75 0 0 0-1.3.75l3 5.196a.75.75 0 0 0 1.3-.75zm2.725-10.667a.75.75 0 0 1 .274 1.025l-3 5.196a.75.75 0 1 1-1.298-.75l3-5.196a.75.75 0 0 1 1.024-.275M11.15 14.973a.75.75 0 0 0-1.3-.75l-3 5.196a.75.75 0 0 0 1.3.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSparkSmall;
