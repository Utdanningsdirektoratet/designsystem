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
const SvgPersonEnvelopeFill = forwardRef<
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
          d="M12 2.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5m0 12A6.75 6.75 0 0 0 5.25 21a.75.75 0 0 0 .75.75h5.525c.172 0 .293-.172.262-.341A2.3 2.3 0 0 1 11.75 21v-4a2.25 2.25 0 0 1 1.002-1.872l.517-.345c.18-.12.132-.39-.08-.427A7 7 0 0 0 12 14.25m4.584.126a.75.75 0 0 1 .832 0l2.28 1.52a.25.25 0 0 1-.027.431l-2.557 1.278a.25.25 0 0 1-.224 0l-2.557-1.278a.25.25 0 0 1-.026-.432zm3.804 3.268a.25.25 0 0 1 .362.224V21a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75v-3.132a.25.25 0 0 1 .362-.224l3.053 1.527a.75.75 0 0 0 .67 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPersonEnvelopeFill;
