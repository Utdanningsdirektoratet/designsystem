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
const SvgFeedingBottle = forwardRef<
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
          d="M19.939 2.293a2.25 2.25 0 0 0-2.592 1.554 3.75 3.75 0 0 0-3.468.971l-.349-.348a.75.75 0 1 0-1.06 1.06l.216.217-2.127.912a2.8 2.8 0 0 0-.862.583l-6.02 6.02a1.75 1.75 0 0 0 0 2.475l4.586 4.586a1.75 1.75 0 0 0 2.474 0l6.021-6.02a2.8 2.8 0 0 0 .583-.862l.912-2.127.217.216a.75.75 0 1 0 1.06-1.06l-.348-.349a3.75 3.75 0 0 0 .971-3.468 2.25 2.25 0 0 0 .938-3.744 2.25 2.25 0 0 0-1.152-.616M19.5 5.25a.75.75 0 1 0-.75-.75 3.8 3.8 0 0 1 .75.75m-1.379 3.81A2.25 2.25 0 0 0 14.94 5.88zM11.15 8.038l2.679-1.149 3.282 3.282-.034.079H8.81l1.947-1.947a1.3 1.3 0 0 1 .392-.265m-6.413 6.285 2.574-2.573h9.123l-.472 1.1a1.3 1.3 0 0 1-.265.392l-6.02 6.02a.25.25 0 0 1-.354 0l-4.586-4.585a.25.25 0 0 1 0-.354"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFeedingBottle;
