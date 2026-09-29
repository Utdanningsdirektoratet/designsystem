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
const SvgReceipt = forwardRef<
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
          d="M6.53 3.47A.75.75 0 0 0 5.25 4v16c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-1.28-.53L16 4.94l-1.47-1.47a.75.75 0 0 0-1.06 0L12 4.94l-1.47-1.47a.75.75 0 0 0-1.06 0L8 4.94zm.22 15.78V5.81l.72.72a.75.75 0 0 0 1.06 0L10 5.06l1.47 1.47a.75.75 0 0 0 1.06 0L14 5.06l1.47 1.47a.75.75 0 0 0 1.06 0l.72-.72v13.44zm2.75-10a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5zM8.75 13a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75m.75 2.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgReceipt;
