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
const SvgBook = forwardRef<
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
          d="M8.25 6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H9A.75.75 0 0 1 8.25 9zm1.5.75v1.5h4.5v-1.5z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M7 2.25A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h12a.75.75 0 0 0 .67-1.085l-.105-.212a3.25 3.25 0 0 1 0-2.906l.106-.212a.75.75 0 0 0 .079-.334V3.5c0-.69-.56-1.25-1.25-1.25zm11.25 1.5H7c-.69 0-1.25.56-1.25 1.25v11.55c.375-.192.8-.3 1.25-.3h11.25zm-.36 16.5a4.75 4.75 0 0 1 0-2.5H7a1.25 1.25 0 1 0 0 2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBook;
