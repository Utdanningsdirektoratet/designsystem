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
const SvgSleep = forwardRef<
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
          d="M12.03 3.355a.75.75 0 0 1 0 1.5 7.78 7.78 0 1 0 7.285 5.043.751.751 0 0 1 1.405-.528 9.3 9.3 0 0 1 .59 3.266 9.28 9.28 0 1 1-9.28-9.28M9.88 12.79a.75.75 0 0 1 1.06 1.06 3.356 3.356 0 0 1-4.746 0 .75.75 0 0 1 1.06-1.06c.726.725 1.901.725 2.626 0m6.911 0a.75.75 0 0 1 1.06 1.06 3.356 3.356 0 0 1-4.745 0 .75.75 0 0 1 1.06-1.06c.725.725 1.9.725 2.625 0m-1.128-7.592a.75.75 0 0 1 .624 1.166l-1.065 1.599h.441a.75.75 0 0 1 0 1.5H13.82a.75.75 0 0 1-.624-1.166l1.066-1.599h-.442a.75.75 0 0 1 0-1.5zm4.423-2.948a.75.75 0 0 1 .61 1.186L19.24 5.475h.846a.75.75 0 0 1 0 1.5h-2.304a.75.75 0 0 1-.61-1.186l1.457-2.039h-.847a.75.75 0 0 1 0-1.5z"
        />
      </svg>
    );
  },
);
export default SvgSleep;
