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
const SvgHardHatFill = forwardRef<
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
          d="M9.75 10V6.012q0-.006.002-.018a1.178 1.178 0 0 1 .223-.544c.204-.272.708-.7 2.025-.7s1.82.428 2.025.7a1.2 1.2 0 0 1 .225.562V10a.75.75 0 0 0 1.5 0V5.805c0-.164.156-.284.313-.234A6.75 6.75 0 0 1 20.75 12v4.764q0 .059.026.112l.533 1.065a1.25 1.25 0 0 1-1.118 1.809H3.809a1.25 1.25 0 0 1-1.118-1.809l.532-1.065a.25.25 0 0 0 .027-.112V12a6.75 6.75 0 0 1 4.687-6.43c.157-.05.313.07.313.235V10a.75.75 0 0 0 1.5 0m.25 3.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHardHatFill;
