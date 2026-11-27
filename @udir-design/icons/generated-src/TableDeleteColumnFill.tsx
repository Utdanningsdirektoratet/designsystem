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
const SvgTableDeleteColumnFill = forwardRef<
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
          d="M8.5 15.5a.25.25 0 0 1 .25.25V20a.75.75 0 0 1-.75.75H6A2.75 2.75 0 0 1 3.25 18v-2.25a.25.25 0 0 1 .25-.25zm12 0a.25.25 0 0 1 .25.25V18A2.75 2.75 0 0 1 18 20.75h-2a.75.75 0 0 1-.75-.75v-4.25a.25.25 0 0 1 .25-.25zm-7.616-5.53a.75.75 0 1 1 1.06 1.06l-.884.884.884.884a.75.75 0 1 1-1.06 1.06L12 12.975l-.884.883a.75.75 0 1 1-1.06-1.06l.884-.884-.884-.884a.75.75 0 1 1 1.06-1.06l.884.883zM8.5 10a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25h-5a.25.25 0 0 1-.25-.25v-3.5A.25.25 0 0 1 3.5 10zm12 0a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25h-5a.25.25 0 0 1-.25-.25v-3.5a.25.25 0 0 1 .25-.25zM8 3.25a.75.75 0 0 1 .75.75v4.25a.25.25 0 0 1-.25.25h-5a.25.25 0 0 1-.25-.25V6A2.75 2.75 0 0 1 6 3.25zm10 0A2.75 2.75 0 0 1 20.75 6v2.25a.25.25 0 0 1-.25.25h-5a.25.25 0 0 1-.25-.25V4a.75.75 0 0 1 .75-.75z"
        />
      </svg>
    );
  },
);
export default SvgTableDeleteColumnFill;
