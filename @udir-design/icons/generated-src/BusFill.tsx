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
const SvgBusFill = forwardRef<
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
          d="M3 5.25a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h1.821c.176 0 .298-.178.257-.349a2.75 2.75 0 1 1 5.345 0c-.042.171.08.349.255.349h2.643c.176 0 .298-.178.257-.349a2.75 2.75 0 1 1 5.345 0c-.042.171.08.349.256.349H21a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75zM17.75 7a.25.25 0 0 1 .25-.25h2a.25.25 0 0 1 .25.25v4a.25.25 0 0 1-.25.25h-2a.25.25 0 0 1-.25-.25zm.25 9.25a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0M7.75 18a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBusFill;
