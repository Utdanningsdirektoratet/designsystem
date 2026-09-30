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
const SvgFeedingBottleFill = forwardRef<
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
          d="M18.639 2.421a2.25 2.25 0 1 1 1.514 4.232 3.75 3.75 0 0 1-.971 3.468l.348.349a.75.75 0 1 1-1.06 1.06l-.217-.216-.912 2.127a2.8 2.8 0 0 1-.583.862l-6.02 6.02a1.75 1.75 0 0 1-2.476 0l-4.585-4.586a1.75 1.75 0 0 1 0-2.474l6.02-6.021a2.8 2.8 0 0 1 .862-.583l2.127-.912-.216-.217a.75.75 0 0 1 1.06-1.06l.349.348a3.75 3.75 0 0 1 3.468-.971 2.25 2.25 0 0 1 1.292-1.426m-4.81 4.468-2.68 1.149a1.3 1.3 0 0 0-.39.265L8.81 10.25h8.266l.033-.079z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFeedingBottleFill;
