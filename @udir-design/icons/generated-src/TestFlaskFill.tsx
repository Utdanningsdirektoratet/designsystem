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
const SvgTestFlaskFill = forwardRef<
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
          d="M9.203 9.24V4.75H9a.75.75 0 0 1 0-1.5h6a.75.75 0 0 1 0 1.5h-.203v4.49l5.473 7.49c.635.87.603 1.907.12 2.701-.475.785-1.373 1.319-2.44 1.319H6.05c-1.067 0-1.965-.534-2.44-1.319a2.395 2.395 0 0 1 .12-2.7zm4.239.687a.75.75 0 0 1-.145-.443V4.75h-2.594v4.734a.75.75 0 0 1-.144.443l-.967 1.323h4.817z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTestFlaskFill;
