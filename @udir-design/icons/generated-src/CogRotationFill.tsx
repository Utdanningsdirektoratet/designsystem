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
const SvgCogRotationFill = forwardRef<
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
          d="M8.268 2.992A9.75 9.75 0 0 1 21.75 12a.75.75 0 0 1-1.5 0A8.25 8.25 0 0 0 4.855 7.875a.75.75 0 0 1-1.4-.375V3a.75.75 0 1 1 1.5 0v2.259a9.75 9.75 0 0 1 3.313-2.267m3.11 3.258a.75.75 0 0 0-.637.354l-.586.94-1.09-.253a.75.75 0 0 0-.7.2l-.873.873a.75.75 0 0 0-.2.7l.253 1.09-.941.587a.75.75 0 0 0-.354.636v1.246c0 .259.134.5.354.636l.94.586-.253 1.09a.75.75 0 0 0 .2.7l.873.874a.75.75 0 0 0 .7.2l1.09-.254.587.941a.75.75 0 0 0 .636.354h1.246a.75.75 0 0 0 .636-.354l.586-.94 1.09.253a.75.75 0 0 0 .7-.2l.874-.873a.75.75 0 0 0 .2-.7l-.254-1.09.941-.587a.75.75 0 0 0 .354-.636v-1.246a.75.75 0 0 0-.354-.636l-.94-.586.253-1.09a.75.75 0 0 0-.2-.7l-.873-.873a.75.75 0 0 0-.7-.2l-1.09.253-.587-.941a.75.75 0 0 0-.636-.354zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-8.25 1a.75.75 0 0 0-1.5 0 9.75 9.75 0 0 0 16.794 6.741V21a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-1.4-.375A8.25 8.25 0 0 1 3.75 12"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCogRotationFill;
