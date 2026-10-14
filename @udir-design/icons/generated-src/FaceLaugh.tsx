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
const SvgFaceLaugh = forwardRef<
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
          d="M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M8.822 14.5h6.38c-.552 1.163-1.751 1.92-3.202 1.92-1.444 0-2.632-.753-3.178-1.92M12 17.92c2.664 0 4.871-1.904 5.023-4.62a.29.29 0 0 0-.292-.3H7.3c-.166 0-.3.135-.292.3.15 2.716 2.328 4.62 4.992 4.62M9.534 9.674a1.25 1.25 0 0 0-1.708.458.75.75 0 0 1-1.299-.75 2.75 2.75 0 0 1 3.757-1.007.75.75 0 0 1-.75 1.299m6.64.458a1.25 1.25 0 0 0-1.708-.458.75.75 0 1 1-.75-1.299 2.75 2.75 0 0 1 3.757 1.007.75.75 0 0 1-1.3.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFaceLaugh;
