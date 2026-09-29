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
const SvgPuzzlePieceFill = forwardRef<
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
          d="M3.25 5A.75.75 0 0 1 4 4.25h4a.75.75 0 0 1 .75.75v.992q0 .007.002.027.003.047.021.14c.026.126.078.287.175.444.166.265.542.647 1.552.647s1.386-.382 1.552-.647a1.4 1.4 0 0 0 .198-.61V5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v3.547c.346-.15.788-.297 1.25-.297 1.518 0 2.75 1.448 2.75 3.25s-1.232 3.25-2.75 3.25c-.462 0-.904-.147-1.25-.297V17a.75.75 0 0 1-.75.75h-3.547c.15.346.297.788.297 1.25 0 .718-.342 1.512-.873 2.119-.544.621-1.361 1.131-2.377 1.131s-1.833-.51-2.377-1.131c-.531-.607-.873-1.401-.873-2.119 0-.462.147-.904.297-1.25H4a.75.75 0 0 1-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPuzzlePieceFill;
