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
const SvgQuietZoneFill = forwardRef<
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
          d="M3.25 4A.75.75 0 0 1 4 3.25h16a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75zm2 15c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25v-.438c0-.574.39-1.074.947-1.213l2.485-.621A.75.75 0 0 0 10.75 16v-3.5a.75.75 0 0 1 1.5 0V19c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25v-6.5a2.25 2.25 0 0 0-4.5 0v2.72a.25.25 0 0 1-.19.242l-1.727.432a2.75 2.75 0 0 0-2.083 2.668zM19 16.75a.25.25 0 0 0 .25-.25v-1a.25.25 0 0 0-.25-.25h-1c-.69 0-1.25-.56-1.25-1.25v-1a.25.25 0 0 1 .25-.25h1a.75.75 0 0 0 0-1.5h-1a.25.25 0 0 1-.25-.25V9a.75.75 0 0 0-.75-.75h-1.8a.25.25 0 0 1-.219-.372l1.673-3.01a.08.08 0 0 0-.069-.118H14.15a.25.25 0 0 0-.218.129L12.67 7.15a1.75 1.75 0 0 0 1.53 2.6h.8a.25.25 0 0 1 .25.25v4A2.75 2.75 0 0 0 18 16.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgQuietZoneFill;
