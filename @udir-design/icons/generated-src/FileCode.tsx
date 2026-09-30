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
const SvgFileCode = forwardRef<
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
          d="M6.5 3.25c-.69 0-1.25.56-1.25 1.25v15c0 .69.56 1.25 1.25 1.25h11c.69 0 1.25-.56 1.25-1.25V8a.75.75 0 0 0-.22-.53l-4-4a.75.75 0 0 0-.53-.22zm6.75 4.25c0 .69.56 1.25 1.25 1.25h2.75v10.5H6.75V4.75h6.5zm2.94-.25-1.44-1.44v1.44zm-.66 7.03-1.75 1.75a.75.75 0 1 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 1 1 1.06-1.06l1.75 1.75a.75.75 0 0 1 0 1.06m-7.06 0a.75.75 0 0 1 0-1.06l1.75-1.75a.75.75 0 1 1 1.06 1.06l-1.22 1.22 1.22 1.22a.75.75 0 1 1-1.06 1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFileCode;
