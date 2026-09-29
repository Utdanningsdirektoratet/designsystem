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
const SvgCandleFill = forwardRef<
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
          d="M12.564 2.002A.75.75 0 0 0 11.444 2L10.04 3.572A2.74 2.74 0 0 0 9.25 5.5a2.75 2.75 0 1 0 4.711-1.928zM3.25 11c0-.966.784-1.75 1.75-1.75h14c.966 0 1.75.784 1.75 1.75v4a4.406 4.406 0 0 1-.057.592c-.055.33-.167.782-.397 1.243a3.6 3.6 0 0 1-.546.804 3.2 3.2 0 0 1-.6.516c-.558.373-1.269.595-2.15.595-.8 0-1.46-.184-1.992-.495a.5.5 0 0 0-.695.198c-.189.359-.464.688-.857.927-.41.25-.9.37-1.456.37-.573 0-1.075-.126-1.492-.389a2.36 2.36 0 0 1-.88-1.023C9.28 17.593 9.25 16.686 9.25 16a.5.5 0 0 0-1 0c0 .679.02 1.793.471 2.76.247.53.642 1.061 1.254 1.447.609.384 1.305.543 2.025.543.7 0 1.378-.152 1.976-.515.406-.247.72-.559.962-.895.605.268 1.295.41 2.062.41 1.056 0 1.965-.269 2.705-.763l.045-.03V20A1.75 1.75 0 0 1 18 21.75H6A1.75 1.75 0 0 1 4.25 20v-4.639A3.9 3.9 0 0 0 6 15.75c.806 0 1.527-.207 2.127-.606.59-.393.96-.904 1.188-1.361a4.2 4.2 0 0 0 .435-1.764.5.5 0 0 0-1-.037q-.006.24-.041.454c-.04.236-.12.563-.288.9-.17.338-.435.7-.848.976-.418.278-.941.438-1.573.438-.631 0-1.154-.16-1.572-.438a2.5 2.5 0 0 1-.849-.977l-.006-.011a3.2 3.2 0 0 1-.323-1.322z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCandleFill;
