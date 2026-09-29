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
const SvgSackKronerFill = forwardRef<
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
          d="M15.264 4.254a.257.257 0 0 0 .328-.159l.074-.223c.429-1.285-.69-2.515-1.98-2.31-.672.106-1.324.188-1.686.188-.363 0-1.014-.082-1.687-.189-1.29-.204-2.408 1.026-1.98 2.31l.075.225a.257.257 0 0 0 .328.158c.981-.34 2.073-.504 3.264-.504s2.283.164 3.264.504M12 5.25c-1.739 0-3.116.393-4.183 1.13-1.068.735-1.758 1.767-2.204 2.925-.817 2.12-.86 4.8-.863 7.204-.127.065-.27.145-.416.242-.42.28-1.084.85-1.084 1.749 0 .77.388 1.324.72 1.655a3 3 0 0 0 .666.5c.113.06.236.095.364.095h14a.75.75 0 0 0 .335-.08h.002l.078-.042a3.03 3.03 0 0 0 .615-.472c.332-.332.72-.887.72-1.656 0-.898-.664-1.469-1.084-1.749a4 4 0 0 0-.416-.242c-.002-2.404-.046-5.085-.863-7.204-.446-1.158-1.136-2.19-2.204-2.926C15.116 5.643 13.74 5.25 12 5.25m-.594 6.706a.75.75 0 1 0-1.2-.9L9.03 12.624v-1.119a.75.75 0 0 0-1.5 0v5.053a.75.75 0 0 0 1.5 0V15.44l1.176 1.568a.75.75 0 0 0 1.2-.9L9.85 14.032zm.722-.45a.75.75 0 0 1 .75-.75h1.579a2.013 2.013 0 0 1 1.062 3.723l.872 1.744a.75.75 0 1 1-1.342.67l-1.056-2.111h-.365v1.776a.75.75 0 0 1-1.5 0zm2.339 1.776h-.839v-1.027h.829a.513.513 0 0 1 .01 1.027"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSackKronerFill;
