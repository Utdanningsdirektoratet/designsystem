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
const SvgClipboardCheckmarkFill = forwardRef<
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
          d="M9.5 2.25a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h5a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75zm-2 2H6a.75.75 0 0 0-.75.75v16c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75V5a.75.75 0 0 0-.75-.75h-1.5a.25.25 0 0 0-.25.25v2a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-2a.25.25 0 0 0-.25-.25m7.03 7.72a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.793.793a.25.25 0 0 0 .354 0l1.793-1.793a.75.75 0 0 1 1.06 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgClipboardCheckmarkFill;
