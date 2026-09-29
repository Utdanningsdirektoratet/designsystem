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
const SvgLifebuoyFill = forwardRef<
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
          d="M17.427 20.401A9.96 9.96 0 0 1 12 22c-2 0-3.863-.587-5.426-1.599l3.705-3.705A5 5 0 0 0 12 17c.605 0 1.185-.107 1.722-.304zm-9.365-5.32c.249.319.537.606.855.856l-3.549 3.548a10 10 0 0 1-.854-.855zm11.421 3.553q-.4.45-.851.85l-3.549-3.548q.477-.374.852-.851zm.918-12.06A9.95 9.95 0 0 1 22 12a9.95 9.95 0 0 1-1.6 5.429l-3.706-3.704A5 5 0 0 0 17 12c0-.605-.107-1.185-.304-1.722zM7.305 10.277A5 5 0 0 0 7 12c0 .604.107 1.183.303 1.719l-3.705 3.705A9.95 9.95 0 0 1 2 12c0-2 .588-3.864 1.6-5.427zm1.61-2.213a5 5 0 0 0-.852.852L4.516 5.368q.4-.451.85-.851zm9.715-3.551q.454.4.855.854l-3.548 3.549a5 5 0 0 0-.856-.855zM12 2c2 0 3.861.587 5.424 1.598l-3.705 3.705A5 5 0 0 0 12 7c-.606 0-1.187.108-1.725.306L6.571 3.6A9.95 9.95 0 0 1 12 2"
        />
      </svg>
    );
  },
);
export default SvgLifebuoyFill;
