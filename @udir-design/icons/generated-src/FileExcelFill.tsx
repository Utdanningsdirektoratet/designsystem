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
const SvgFileExcelFill = forwardRef<
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
          d="M13.25 3.5a.25.25 0 0 0-.25-.25H6.5c-.69 0-1.25.56-1.25 1.25v6c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25V9a.25.25 0 0 0-.25-.25h-4c-.69 0-1.25-.56-1.25-1.25zM15 7.25a.25.25 0 0 1-.25-.25V4.293a.25.25 0 0 1 .427-.177l2.707 2.707a.25.25 0 0 1-.177.427zm-12 5a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75zm12.471 6.638q.4.182.938.182.54 0 .931-.189.4-.189.616-.532.224-.343.224-.79 0-.624-.35-1.023-.35-.405-1.029-.56l-.546-.126a.68.68 0 0 1-.37-.21.6.6 0 0 1-.127-.385q0-.252.161-.385.162-.14.462-.14.322 0 .49.14a.47.47 0 0 1 .175.385h1.05q0-.658-.462-1.043-.454-.392-1.239-.392-.518 0-.896.182a1.4 1.4 0 0 0-.588.518 1.45 1.45 0 0 0-.203.777q0 .602.357 1.022.364.412 1.015.567l.518.12q.252.055.392.216t.14.385a.49.49 0 0 1-.189.406q-.181.147-.51.147-.344 0-.547-.147a.5.5 0 0 1-.196-.413h-1.05q0 .448.217.777.217.33.616.511M5.635 19l1.372-2.639-1.281-2.47H6.88l.532 1.12q.077.153.126.28.055.125.07.181.014-.056.063-.182.048-.126.119-.28l.546-1.12h1.127l-1.281 2.471 1.372 2.64H8.4l-.616-1.26a11 11 0 0 1-.21-.49 2.863 2.863 0 0 1-.196.49L6.762 19zm4.932 0v-5.11h1.05v4.13h2.065V19z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileExcelFill;
