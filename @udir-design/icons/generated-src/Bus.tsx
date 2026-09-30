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
const SvgBus = forwardRef<
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
          d="M3 5.25a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h2.458a2.5 2.5 0 0 0 4.584 0h3.916a2.5 2.5 0 0 0 4.584 0H21a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75zm14 7.5a.75.75 0 0 1-.75-.75V6.75H3.75v9H5.3a2.5 2.5 0 0 1 4.9 0h3.6a2.5 2.5 0 0 1 4.9 0h1.55v-3zm-9.25 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m8.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m4-4h-2.5v-4.5h2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBus;
