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
const SvgTasklistStart = forwardRef<
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
          d="M5.75 3.75v16.5H8a.75.75 0 0 1 0 1.5H5.5c-.69 0-1.25-.56-1.25-1.25v-17c0-.69.56-1.25 1.25-1.25h13c.69 0 1.25.56 1.25 1.25V13a.75.75 0 0 1-1.5 0V3.75zM11.1 7.2a.75.75 0 1 0-1.2-.9l-.981 1.308-.389-.388a.75.75 0 0 0-1.06 1.06l1 1A.75.75 0 0 0 9.6 9.2zm1.9.05a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5zm-.147 4.998a.498.498 0 1 1 .996 0v2.704a.75.75 0 0 0 .603.736l2.812.562c.708.142 1.141.863.934 1.555L17.5 20.13h-5.463l-2.22-3.33a.398.398 0 0 1 .614-.5l1.138 1.154a.75.75 0 0 0 1.284-.526zm.498-1.998a2 2 0 0 0-1.998 1.998v2.867a1.898 1.898 0 0 0-2.784 2.518l2.442 3.664a.75.75 0 0 0 .624.334h6.423a.75.75 0 0 0 .718-.535l.858-2.86a2.726 2.726 0 0 0-2.076-3.457l-2.209-.441v-2.09a2 2 0 0 0-1.998-1.998"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTasklistStart;
