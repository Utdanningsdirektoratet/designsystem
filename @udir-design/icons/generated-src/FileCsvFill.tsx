import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgFileCsvFill = forwardRef<
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
          d="M13.25 3.5a.25.25 0 0 0-.25-.25H6.5c-.69 0-1.25.56-1.25 1.25v6c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25V9a.25.25 0 0 0-.25-.25h-4c-.69 0-1.25-.56-1.25-1.25zM15 7.25a.25.25 0 0 1-.25-.25V4.293a.25.25 0 0 1 .427-.177l2.707 2.707a.25.25 0 0 1-.177.427zm-12 5a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75zm4.622 6.82q-.511 0-.896-.189a1.5 1.5 0 0 1-.602-.539 1.55 1.55 0 0 1-.21-.812v-2.17q0-.469.21-.812.217-.343.602-.532a1.95 1.95 0 0 1 .896-.196q.518 0 .896.196.385.189.595.532.217.344.217.812H8.28q0-.308-.175-.469-.168-.16-.483-.16t-.49.16q-.168.16-.168.47v2.17q0 .3.168.468.175.16.49.161.315 0 .483-.16.175-.17.175-.47h1.05q0 .462-.217.812-.21.343-.595.54-.378.188-.896.188m4.38 0q-.54 0-.939-.182a1.43 1.43 0 0 1-.616-.51 1.4 1.4 0 0 1-.217-.778h1.05q0 .259.196.413.204.147.546.147.33 0 .511-.147a.49.49 0 0 0 .19-.406.57.57 0 0 0-.14-.385.7.7 0 0 0-.393-.217l-.518-.119q-.65-.155-1.015-.567a1.53 1.53 0 0 1-.357-1.022q0-.448.203-.777.21-.336.588-.518t.896-.182q.784 0 1.24.392.46.385.461 1.043h-1.05a.47.47 0 0 0-.175-.385q-.168-.14-.49-.14-.3 0-.462.14-.16.133-.16.385 0 .225.125.385a.68.68 0 0 0 .371.21l.546.126q.68.155 1.03.56.35.4.35 1.022 0 .448-.225.791-.216.343-.616.532a2.1 2.1 0 0 1-.93.19m2.482-5.18L15.75 19h1.33l1.253-5.11h-1.057l-.686 3.22q-.036.175-.077.434-.043.26-.07.441a8 8 0 0 0-.084-.44q-.05-.26-.084-.428l-.707-3.227z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileCsvFill;
