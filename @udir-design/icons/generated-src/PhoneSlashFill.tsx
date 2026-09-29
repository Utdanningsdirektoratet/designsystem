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
const SvgPhoneSlashFill = forwardRef<
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
          d="M15.616 12.323a1.25 1.25 0 0 1 1.768 0l3.793 3.793a1.25 1.25 0 0 1 0 1.768l-2.781 2.781a2.61 2.61 0 0 1-2.81.576 23 23 0 0 1-5.563-3.19.25.25 0 0 1-.023-.37l3.742-3.741a.18.18 0 0 1 .258 0zm2.659-7.158a.75.75 0 0 1 1.06 1.06L5.03 20.53a.75.75 0 0 1-1.06-1.06zM6.116 2.823a1.25 1.25 0 0 1 1.768 0l3.793 3.793a1.25 1.25 0 0 1 0 1.768L10.06 10l.452.452a.25.25 0 0 1 0 .354l-3.75 3.749a.25.25 0 0 1-.366-.016 23 23 0 0 1-3.639-6.124 2.61 2.61 0 0 1 .577-2.811z"
        />
      </svg>
    );
  },
);
export default SvgPhoneSlashFill;
