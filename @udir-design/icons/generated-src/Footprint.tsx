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
const SvgFootprint = forwardRef<
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
          d="M5.579 6.871a3.1 3.1 0 0 1 3.599-.012c1.545 1.092 2.43 2.995 1.79 4.968l-.562 1.73c-.434 1.337-.425 2.712-.157 4.153a3.128 3.128 0 1 1-6.187.241l.154-1.444a4.5 4.5 0 0 0-.135-1.658l-.578-2.105a5.45 5.45 0 0 1 2.076-5.873M8.31 8.083a1.6 1.6 0 0 0-1.856.008 3.95 3.95 0 0 0-1.506 4.256l.58 2.104c.197.72.259 1.473.18 2.215l-.154 1.445a1.63 1.63 0 1 0 3.22-.126c-.298-1.604-.328-3.246.205-4.891l.56-1.728c.402-1.237-.117-2.496-1.229-3.283m6.575-5.224a3.1 3.1 0 0 1 3.597.012 5.45 5.45 0 0 1 2.077 5.873l-.578 2.105a4.5 4.5 0 0 0-.135 1.658L20 13.951a3.129 3.129 0 1 1-6.187-.24c.268-1.442.276-2.816-.158-4.154l-.56-1.73c-.64-1.973.244-3.876 1.79-4.968m2.723 1.232a1.6 1.6 0 0 0-1.856-.008c-1.112.787-1.63 2.046-1.23 3.283l.56 1.728c.534 1.645.504 3.287.206 4.89a1.63 1.63 0 1 0 3.22.127l-.154-1.445a6 6 0 0 1 .181-2.215l.58-2.104a3.95 3.95 0 0 0-1.507-4.256"
        />
      </svg>
    );
  },
);
export default SvgFootprint;
