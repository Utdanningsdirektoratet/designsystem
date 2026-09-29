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
const SvgDoorOpenFill = forwardRef<
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
          d="M4.45 2.49a.75.75 0 0 0-.2.51v18c0 .414.336.75.75.75h11a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.553-.724L10.6 3.75h7.65V21a.75.75 0 0 0 1.5 0V3a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0-.55.24M11.25 13a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDoorOpenFill;
