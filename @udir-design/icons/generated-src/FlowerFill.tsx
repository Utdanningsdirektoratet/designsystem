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
const SvgFlowerFill = forwardRef<
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
          d="M5.25 8.5a6.75 6.75 0 1 1 7.5 6.709V21.5a.75.75 0 0 1-1.5 0v-6.291a6.75 6.75 0 0 1-6-6.709M3.5 14.25a.75.75 0 0 0-.75.75c0 1.631.41 2.904 1.063 3.885.65.975 1.513 1.616 2.352 2.036a8.1 8.1 0 0 0 2.274.725 8 8 0 0 0 .969.102l.092.002a.75.75 0 0 0 .75-.75c0-1.631-.41-2.904-1.063-3.885-.65-.975-1.513-1.616-2.352-2.036a8.1 8.1 0 0 0-2.274-.725A6.5 6.5 0 0 0 3.5 14.25m17 0a.75.75 0 0 1 .75.75c0 1.631-.41 2.904-1.064 3.885-.65.975-1.512 1.616-2.35 2.036a8.1 8.1 0 0 1-2.275.725 8 8 0 0 1-.969.102l-.092.002a.75.75 0 0 1-.75-.75c0-1.631.41-2.904 1.063-3.885.65-.975 1.513-1.616 2.352-2.036a8.1 8.1 0 0 1 2.274-.725 8 8 0 0 1 .969-.102z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFlowerFill;
