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
const SvgFigureCombinationFill = forwardRef<
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
          d="M9.8 5a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0m3.5 4a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H14.8V21a.75.75 0 0 1-1.5 0zm-4.193.411a1.75 1.75 0 0 1 1.648-1.161h.295a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-4.25H7.55a.75.75 0 0 1-.706-1.002z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFigureCombinationFill;
