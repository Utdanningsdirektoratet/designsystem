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
const SvgFileJpegFill = forwardRef<
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
          d="M13 3.25a.25.25 0 0 1 .25.25v4c0 .69.56 1.25 1.25 1.25h4a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-13a.25.25 0 0 1-.25-.25v-6c0-.69.56-1.25 1.25-1.25zm2.177.866a.25.25 0 0 0-.427.177V7c0 .138.112.25.25.25h2.707a.25.25 0 0 0 .177-.427z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          d="M9.903 16.193H9.21v-1.358h.693q.336 0 .532.189a.63.63 0 0 1 .203.49.65.65 0 0 1-.203.497q-.195.182-.532.182"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M3 12.25a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75zm.9 6.393q.476.434 1.28.434.813 0 1.281-.427.47-.434.47-1.176V13.89H4.724v.98H5.88v2.604q0 .322-.189.511-.189.182-.51.182-.323 0-.512-.189a.72.72 0 0 1-.189-.518H3.43q0 .742.47 1.183m4.26-4.753V19h1.05v-1.862h.693q.54 0 .938-.203.399-.203.623-.567.224-.37.224-.854 0-.49-.224-.854a1.47 1.47 0 0 0-.623-.567 2.04 2.04 0 0 0-.938-.203zm4.505 0V19h3.15v-.896h-2.121V16.83h1.876v-.896h-1.876v-1.148h2.121v-.896zm5.08 4.991q.384.189.895.189.518 0 .896-.189.385-.195.595-.539a1.5 1.5 0 0 0 .217-.812V16.2h-1.806v.889h.756v.441q0 .3-.175.469-.168.16-.483.161-.315 0-.49-.161-.168-.168-.168-.469v-2.17q0-.308.168-.469.175-.16.49-.161.315 0 .483.161.175.161.175.469h1.05q0-.469-.217-.812a1.4 1.4 0 0 0-.595-.532 1.9 1.9 0 0 0-.896-.196q-.511 0-.896.196a1.45 1.45 0 0 0-.602.532q-.21.344-.21.812v2.17q0 .462.21.812a1.5 1.5 0 0 0 .602.539"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileJpegFill;
