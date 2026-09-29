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
const SvgFileWordFill = forwardRef<
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
          d="M13.25 3.5a.25.25 0 0 0-.25-.25H6.5c-.69 0-1.25.56-1.25 1.25v6c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25V9a.25.25 0 0 0-.25-.25h-4c-.69 0-1.25-.56-1.25-1.25zM15 7.25a.25.25 0 0 1-.25-.25V4.293a.25.25 0 0 1 .427-.177l2.707 2.707a.25.25 0 0 1-.177.427zm-12 5a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75zm9.002 6.82q-.51 0-.89-.189a1.46 1.46 0 0 1-.587-.539 1.6 1.6 0 0 1-.203-.812v-2.17q0-.462.203-.805.21-.35.588-.539.378-.196.889-.196.517 0 .889.196.378.189.58.54.21.342.21.804v2.17q0 .462-.21.812a1.4 1.4 0 0 1-.58.54 1.94 1.94 0 0 1-.89.188m-4.407-5.18q.531 0 .924.203.398.203.616.574.224.364.224.861v1.827q0 .49-.224.861-.217.37-.616.581-.393.203-.924.203h-1.66v-5.11zm7.946 4.991q.385.19.896.19.518 0 .896-.19.385-.195.595-.539a1.5 1.5 0 0 0 .217-.812h-1.05q0 .3-.175.47-.168.16-.483.16t-.49-.16q-.168-.17-.168-.47v-2.17q0-.308.168-.469.175-.16.49-.16t.483.16q.175.16.175.47h1.05q0-.47-.217-.813a1.4 1.4 0 0 0-.595-.532 1.9 1.9 0 0 0-.896-.196q-.511 0-.896.196a1.45 1.45 0 0 0-.602.532q-.21.344-.21.812v2.17q0 .462.21.812a1.5 1.5 0 0 0 .602.54m-3.54-.72q.315 0 .47-.162.16-.168.16-.469v-2.17q0-.308-.153-.469-.154-.16-.476-.16t-.476.16q-.154.16-.154.47v2.17q0 .3.154.468.16.16.476.161m-3.888-3.109a.73.73 0 0 0-.518-.182h-.61v3.15h.61q.321 0 .518-.182a.63.63 0 0 0 .196-.483v-1.827a.62.62 0 0 0-.196-.476"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileWordFill;
