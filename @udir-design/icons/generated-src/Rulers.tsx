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
const SvgRulers = forwardRef<
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
          d="M7.81 3.706a.75.75 0 0 1 .69-.456H20a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.291.519l-11.5-12a.75.75 0 0 1-.149-.813m2.448 1.044 8.992 9.383V4.75zm5.05 2.213A.75.75 0 0 1 16 6.5h.75a.75.75 0 0 1 .75.75V8a.75.75 0 0 1-1.28.53l-.75-.75a.75.75 0 0 1-.163-.817M5.97 5.97a.75.75 0 0 1 1.06 0l11 11a.75.75 0 0 1 0 1.06l-2.793 2.793a1.75 1.75 0 0 1-2.474 0l-9.586-9.586a1.75 1.75 0 0 1 0-2.474zm.53 1.59L4.237 9.824a.25.25 0 0 0 0 .354l9.586 9.586a.25.25 0 0 0 .354 0l2.262-2.263-1.939-1.94-.97.97a.75.75 0 1 1-1.06-1.06l.97-.97L12 13.06l-.97.97a.75.75 0 1 1-1.06-1.06l.97-.97-1.44-1.44-.97.97a.75.75 0 0 1-1.06-1.06l.97-.97z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRulers;
