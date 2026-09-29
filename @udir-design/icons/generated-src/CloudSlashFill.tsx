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
const SvgCloudSlashFill = forwardRef<
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
          d="M19.335 6.226a.75.75 0 1 0-1.06-1.06L3.97 19.47a.75.75 0 1 0 1.06 1.06zm-5.085.842a.24.24 0 0 0-.03-.37c-.897-.61-1.96-.948-3.165-.948-3.161 0-5.653 2.573-5.886 5.87v.001l-.001.019a.18.18 0 0 1-.135.16H5.03l-.01.003c-.814.216-1.51.602-2.008 1.17-.503.576-.762 1.295-.762 2.093 0 .925.342 1.75 1.012 2.332q.102.09.212.169a.24.24 0 0 0 .307-.03zM9.859 17.823a.25.25 0 0 0 .177.427h7.263c2.483 0 4.451-1.92 4.451-4.379 0-1.187-.465-2.297-1.352-3.104-.586-.533-1.334-.915-2.212-1.112a.24.24 0 0 0-.226.067z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCloudSlashFill;
