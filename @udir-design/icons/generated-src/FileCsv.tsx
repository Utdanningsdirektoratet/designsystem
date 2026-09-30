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
const SvgFileCsv = forwardRef<
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
          d="M5.25 4.5c0-.69.56-1.25 1.25-1.25H14a.75.75 0 0 1 .53.22l4 4c.141.14.22.331.22.53v4.25H21a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75h2.25zm9.25 4.25c-.69 0-1.25-.56-1.25-1.25V4.75h-6.5v7.5h10.5v-3.5zm.25-2.94 1.44 1.44h-1.44zM7.622 19.07q-.511 0-.896-.189a1.5 1.5 0 0 1-.602-.539 1.55 1.55 0 0 1-.21-.812v-2.17q0-.469.21-.812.217-.343.602-.532a1.95 1.95 0 0 1 .896-.196q.518 0 .896.196.385.189.595.532.217.344.217.812H8.28q0-.308-.175-.469-.168-.16-.483-.16t-.49.16q-.168.16-.168.47v2.17q0 .3.168.468.175.16.49.161.315 0 .483-.16.175-.17.175-.47h1.05q0 .462-.217.812-.21.343-.595.54-.378.188-.896.188m4.38 0q-.54 0-.939-.182a1.43 1.43 0 0 1-.616-.51 1.4 1.4 0 0 1-.217-.778h1.05q0 .259.196.413.204.147.546.147.33 0 .511-.147a.49.49 0 0 0 .19-.406.57.57 0 0 0-.14-.385.7.7 0 0 0-.393-.217l-.518-.119q-.65-.155-1.015-.567a1.53 1.53 0 0 1-.357-1.022q0-.448.203-.777.21-.336.588-.518t.896-.182q.784 0 1.24.392.46.385.461 1.043h-1.05a.47.47 0 0 0-.175-.385q-.168-.14-.49-.14-.3 0-.462.14-.16.133-.16.385 0 .225.125.385a.68.68 0 0 0 .371.21l.546.126q.68.155 1.03.56.35.4.35 1.022 0 .448-.225.791-.216.343-.616.532a2.1 2.1 0 0 1-.93.19m2.482-5.18L15.75 19h1.33l1.253-5.11h-1.057l-.686 3.22q-.036.175-.077.434-.043.26-.07.441a8 8 0 0 0-.084-.44q-.05-.26-.084-.428l-.707-3.227z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileCsv;
