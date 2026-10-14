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
const SvgLinkBroken = forwardRef<
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
          d="M6.59 2.843a.75.75 0 0 1 1.024.275l1 1.732a.75.75 0 0 1-1.3.75l-1-1.732a.75.75 0 0 1 .275-1.025m8.496 2.235a2.25 2.25 0 0 1 3.182 0l.757.758a2.25 2.25 0 0 1 0 3.182l-2.879 2.878a.75.75 0 1 0 1.061 1.061l2.879-2.879a3.75 3.75 0 0 0 0-5.303l-.758-.757a3.75 3.75 0 0 0-5.303 0l-2.879 2.878a.75.75 0 1 0 1.061 1.061zm-7.482 7.63a.75.75 0 0 0-1.061-1.062l-2.379 2.38a3.75 3.75 0 0 0 0 5.302l.758.758a3.75 3.75 0 0 0 5.303 0l2.379-2.379a.75.75 0 1 0-1.061-1.06l-2.379 2.378a2.25 2.25 0 0 1-3.182 0l-.757-.757a2.25 2.25 0 0 1 0-3.182zM2.844 6.59a.75.75 0 0 1 1.024-.275l1.732 1a.75.75 0 1 1-.75 1.3l-1.732-1a.75.75 0 0 1-.275-1.025m15.72 8.21a.75.75 0 0 0-.75 1.3l1.733 1a.75.75 0 0 0 .75-1.3zM16.1 17.816a.75.75 0 0 0-1.299.75l1 1.732a.75.75 0 0 0 1.3-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLinkBroken;
