import React, {
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
const SvgFileJpeg = forwardRef<
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
          d="M9.21 16.193h.693q.336 0 .532-.182a.65.65 0 0 0 .203-.497.63.63 0 0 0-.203-.49q-.195-.189-.532-.189H9.21z"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M5.25 4.5c0-.69.56-1.25 1.25-1.25H14a.75.75 0 0 1 .53.22l4 4c.141.14.22.331.22.53v4.25H21a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75h2.25zm1.5 7.75h10.5v-3.5H14.5c-.69 0-1.25-.56-1.25-1.25V4.75h-6.5zm8-6.44 1.44 1.44h-1.44zM5.18 19.078q-.804 0-1.28-.434-.47-.44-.47-1.183h1.05q0 .322.19.518.188.189.51.189t.511-.182q.19-.189.19-.511V14.87H4.724v-.98H6.93v3.584q0 .743-.469 1.176-.469.427-1.28.427M8.16 19v-5.11h1.743q.54 0 .938.203.405.202.623.567.224.364.224.854 0 .483-.224.854-.224.364-.623.567a2.04 2.04 0 0 1-.938.203H9.21V19zm4.505 0v-5.11h3.15v.896h-2.121v1.148h1.876v.896h-1.876v1.274h2.121V19zm5.975.07q-.511 0-.896-.189a1.5 1.5 0 0 1-.602-.539 1.55 1.55 0 0 1-.21-.812v-2.17q0-.469.21-.812.218-.343.602-.532.386-.195.896-.196.518 0 .896.196.385.189.595.532.217.344.217.812h-1.05q0-.308-.175-.469-.168-.16-.483-.161-.315 0-.49.161-.168.161-.168.469v2.17q0 .3.168.469.175.16.49.161.315 0 .483-.161.175-.168.175-.469v-.441h-.756V16.2h1.806v1.33q0 .462-.217.812-.21.343-.595.539-.377.189-.896.189"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileJpeg;
