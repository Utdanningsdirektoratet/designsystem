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
const SvgTruckPercent = forwardRef<
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
          d="M2.25 5.5c0-.69.56-1.25 1.25-1.25h11c.69 0 1.25.56 1.25 1.25v1.75h2.912c.51 0 .97.311 1.16.786l1.928 4.82V16.5c0 .69-.56 1.25-1.25 1.25h-.75a2.5 2.5 0 0 1-5 0h-5a2.5 2.5 0 0 1-5 0H3.5c-.69 0-1.25-.56-1.25-1.25zm7 10.75a2.5 2.5 0 0 0-2-1c-.818 0-1.544.393-2 1h-1.5V5.75h10.5v10.5zm6.5-.5a2.496 2.496 0 0 1 3.5.5h1v-3.106L18.492 8.75H15.75zm.5 2a1 1 0 1 1 2 0 1 1 0 0 1-2 0m-9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1.28-3.78a.75.75 0 1 0 1.06 1.06l5-5a.75.75 0 0 0-1.06-1.06zM7 7.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25M9.875 13a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTruckPercent;
