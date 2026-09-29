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
const SvgFileWord = forwardRef<
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
          d="M12.47 18q-.153.16-.468.16t-.476-.16q-.154-.17-.154-.47v-2.17q0-.308.154-.469t.476-.16.476.16.154.47v2.17q0 .3-.161.468M7.595 14.87a.73.73 0 0 1 .518.182.62.62 0 0 1 .196.476v1.827q0 .3-.196.483a.73.73 0 0 1-.518.182h-.61v-3.15z"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M5.25 4.5c0-.69.56-1.25 1.25-1.25H14a.75.75 0 0 1 .53.22l4 4c.141.14.22.331.22.53v4.25H21a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75h2.25zm9.25 4.25c-.69 0-1.25-.56-1.25-1.25V4.75h-6.5v7.5h10.5v-3.5zm.25-2.94 1.44 1.44h-1.44zm-3.637 13.071q.378.19.889.19.517 0 .889-.19.378-.195.58-.539.21-.35.21-.812v-2.17q0-.462-.21-.805a1.35 1.35 0 0 0-.58-.539 1.9 1.9 0 0 0-.89-.196q-.51 0-.888.196a1.4 1.4 0 0 0-.588.54 1.55 1.55 0 0 0-.203.804v2.17q0 .462.203.812.21.343.588.54m-2.594-4.788a2 2 0 0 0-.924-.203h-1.66V19h1.66q.531 0 .924-.203.398-.21.616-.58.224-.372.224-.862v-1.827a1.6 1.6 0 0 0-.224-.86 1.47 1.47 0 0 0-.616-.575m7.918 4.977q-.511 0-.896-.189a1.5 1.5 0 0 1-.602-.539 1.55 1.55 0 0 1-.21-.812v-2.17q0-.469.21-.812.217-.343.602-.532.385-.196.896-.196.518 0 .896.196.385.189.595.532.217.344.217.812h-1.05q0-.308-.175-.469-.168-.16-.483-.16t-.49.16q-.168.16-.168.47v2.17q0 .3.168.468.175.16.49.161.315 0 .483-.16.175-.17.175-.47h1.05q0 .462-.217.812-.21.343-.595.54-.378.188-.896.188"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileWord;
