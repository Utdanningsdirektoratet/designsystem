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
const SvgHeadHeart = forwardRef<
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
          d="M5.75 11a7.25 7.25 0 1 1 12.688 4.795l-.188.213V21.5a.75.75 0 0 0 1.5 0v-4.932a8.75 8.75 0 1 0-15.5-5.68l-1.468 4.897a.75.75 0 0 0 .718.965h1.75V18A2.75 2.75 0 0 0 8 20.75h2.25v.75a.75.75 0 0 0 1.5 0V20a.75.75 0 0 0-.75-.75H8c-.69 0-1.25-.56-1.25-1.25v-2a.75.75 0 0 0-.75-.75H4.508l1.242-4.14zm5.03-2.222a1.02 1.02 0 0 1 1.44 0l.25.25a.75.75 0 0 0 1.06 0l.25-.25a1.018 1.018 0 1 1 1.44 1.44L13 12.437l-2.22-2.22a1.02 1.02 0 0 1 0-1.44m-1.06-1.06A2.52 2.52 0 0 1 13 7.474a2.518 2.518 0 0 1 3.28 3.803l-2.75 2.75a.75.75 0 0 1-1.06 0l-2.75-2.75a2.52 2.52 0 0 1 0-3.56"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHeadHeart;
