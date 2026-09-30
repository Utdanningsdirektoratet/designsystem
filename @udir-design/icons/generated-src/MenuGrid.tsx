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
const SvgMenuGrid = forwardRef<
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
          d="M4.25 5A.75.75 0 0 1 5 4.25h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75zm0 6.25A.75.75 0 0 1 5 10.5h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75zm.75 5.5a.75.75 0 0 0-.75.75V19c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75zM10.5 5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75zm.75 5.5a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75zm-.75 7a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75V19a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75zm7-13.25a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75H19a.75.75 0 0 0 .75-.75V5a.75.75 0 0 0-.75-.75zm-.75 7a.75.75 0 0 1 .75-.75H19a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75zm.75 5.5a.75.75 0 0 0-.75.75V19c0 .414.336.75.75.75H19a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMenuGrid;
