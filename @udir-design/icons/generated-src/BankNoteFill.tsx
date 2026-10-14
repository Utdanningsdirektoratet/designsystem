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
const SvgBankNoteFill = forwardRef<
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
          d="M5.25 5.5A.25.25 0 0 0 5 5.25H3a.75.75 0 0 0-.75.75v2c0 .138.112.25.25.25H3A2.25 2.25 0 0 0 5.25 6zM2.5 9.75a.25.25 0 0 0-.25.25v4c0 .138.112.25.25.25H3A3.75 3.75 0 0 1 6.75 18v.5c0 .138.112.25.25.25h10a.25.25 0 0 0 .25-.25V18A3.75 3.75 0 0 1 21 14.25h.5a.25.25 0 0 0 .25-.25v-4a.25.25 0 0 0-.25-.25H21A3.75 3.75 0 0 1 17.25 6v-.5a.25.25 0 0 0-.25-.25H7a.25.25 0 0 0-.25.25V6A3.75 3.75 0 0 1 3 9.75zM5.25 18v.5a.25.25 0 0 1-.25.25H3a.75.75 0 0 1-.75-.75v-2a.25.25 0 0 1 .25-.25H3A2.25 2.25 0 0 1 5.25 18m13.5.5c0 .138.112.25.25.25h2a.75.75 0 0 0 .75-.75v-2a.25.25 0 0 0-.25-.25H21A2.25 2.25 0 0 0 18.75 18zm3-12.5v2a.25.25 0 0 1-.25.25H21A2.25 2.25 0 0 1 18.75 6v-.5a.25.25 0 0 1 .25-.25h2a.75.75 0 0 1 .75.75m-11.5 6c0-1.376.906-2.25 1.75-2.25s1.75.874 1.75 2.25c0 1.377-.906 2.25-1.75 2.25s-1.75-.873-1.75-2.25M12 8.25c-1.917 0-3.25 1.813-3.25 3.75s1.333 3.75 3.25 3.75 3.25-1.813 3.25-3.75S13.917 8.25 12 8.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBankNoteFill;
