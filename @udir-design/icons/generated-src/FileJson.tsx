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
const SvgFileJson = forwardRef<
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
          d="M14.673 18q-.154.16-.469.16t-.476-.16q-.153-.17-.154-.47v-2.17q0-.308.154-.469.155-.16.476-.16.323 0 .476.16.154.16.154.47v2.17q0 .3-.16.468"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M6.5 3.25c-.69 0-1.25.56-1.25 1.25v7.75H3a.75.75 0 0 0-.75.75v7c0 .414.336.75.75.75h18a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75h-2.25V8a.75.75 0 0 0-.22-.53l-4-4a.75.75 0 0 0-.53-.22zm8 5.5c-.69 0-1.25-.56-1.25-1.25V4.75h-6.5v7.5h10.5v-3.5zm1.69-1.5-1.44-1.44v1.44zM8.858 18.888q.4.182.938.182.54 0 .931-.189.399-.189.616-.532.225-.343.224-.79 0-.624-.35-1.023-.35-.405-1.029-.56l-.546-.126a.68.68 0 0 1-.371-.21.6.6 0 0 1-.126-.385q0-.252.16-.385.162-.14.463-.14.322 0 .49.14a.47.47 0 0 1 .175.385h1.05q0-.658-.462-1.043-.454-.392-1.24-.392-.517 0-.895.182a1.4 1.4 0 0 0-.588.518 1.45 1.45 0 0 0-.203.777q0 .602.357 1.022.364.412 1.015.567l.518.12q.252.055.392.216t.14.385a.49.49 0 0 1-.189.406q-.182.147-.511.147-.343 0-.546-.147a.5.5 0 0 1-.196-.413h-1.05q0 .448.217.777.217.33.616.511m-4.96-.245q.476.434 1.28.434.813 0 1.282-.427.468-.434.469-1.176V13.89H4.725v.98H5.88v2.604q0 .322-.19.511-.188.182-.51.182t-.511-.189a.72.72 0 0 1-.19-.518H3.43q0 .743.47 1.183m10.305.427q-.51 0-.889-.189a1.46 1.46 0 0 1-.588-.539 1.6 1.6 0 0 1-.203-.812v-2.17q0-.462.203-.805.21-.35.588-.539.378-.196.89-.196.517 0 .888.196.378.189.581.54.21.342.21.804v2.17q0 .462-.21.812a1.4 1.4 0 0 1-.58.54 1.94 1.94 0 0 1-.89.188m3.651-2.31q0-.245-.02-.56a26 26 0 0 0-.078-1.155L19.068 19h1.224v-5.11h-.924v2.1q0 .238.014.581.02.335.05.68l.049.594-1.323-3.955H16.93V19h.924z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileJson;
