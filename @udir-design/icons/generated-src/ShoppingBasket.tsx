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
const SvgShoppingBasket = forwardRef<
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
          d="M5.25 4A.75.75 0 0 1 6 3.25h12a.75.75 0 0 1 .75.75v4.25H20a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-.338l-.918 7.343a.75.75 0 0 1-.744.657H6a.75.75 0 0 1-.744-.657l-.918-7.343H4a.75.75 0 0 1-.75-.75V9A.75.75 0 0 1 4 8.25h1.25zm-.26 7.25h14.26v-1.5H4.75v1.5zm13.16 1.5-.812 6.5H6.662l-.812-6.5zm-.9-8v3.5H6.75v-3.5zm-4.5 9.75a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0zm-3.16-.07a.75.75 0 0 0-1.493.157l.314 2.983a.75.75 0 0 0 1.492-.157zm5.645-.668a.75.75 0 0 1 .668.825l-.314 2.983a.75.75 0 0 1-1.492-.157l.314-2.983a.75.75 0 0 1 .824-.668"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgShoppingBasket;
