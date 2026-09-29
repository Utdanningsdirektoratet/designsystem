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
const SvgSkipBackwardFill = forwardRef<
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
          d="M4 6.25a.75.75 0 0 0-.75.75v10a.75.75 0 0 0 1.5 0V7A.75.75 0 0 0 4 6.25m9.75 3.064-1.767 1.262a1.75 1.75 0 0 0 0 2.848l1.767 1.262V17a.75.75 0 0 1-1.186.61l-7-5a.75.75 0 0 1 0-1.22l7-5A.75.75 0 0 1 13.75 7zm5.814-2.924A.75.75 0 0 1 20.75 7v10a.75.75 0 0 1-1.186.61l-7-5a.75.75 0 0 1 0-1.22z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSkipBackwardFill;
