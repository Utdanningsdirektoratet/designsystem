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
const SvgTableCellsMergeFill = forwardRef<
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
          d="M11 17.5a.25.25 0 0 1 .25.25v2.75a.25.25 0 0 1-.25.25H6A2.75 2.75 0 0 1 3.25 18v-.25a.25.25 0 0 1 .25-.25zm9.5 0a.25.25 0 0 1 .25.25V18A2.75 2.75 0 0 1 18 20.75h-5a.25.25 0 0 1-.25-.25v-2.75a.25.25 0 0 1 .25-.25zm0-9.5a.25.25 0 0 1 .25.25v7.5a.25.25 0 0 1-.25.25h-17a.25.25 0 0 1-.25-.25v-7.5A.25.25 0 0 1 3.5 8zm-4.97 1.47a.75.75 0 1 0-1.06 1.06l.72.72H8.81l.72-.72a.75.75 0 1 0-1.06-1.06l-2 2a.8.8 0 0 0-.12.16q-.023.037-.041.078l-.004.01a.75.75 0 0 0 .165.812l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72h6.38l-.72.72a.75.75 0 0 0 1.06 1.06l2-2a.77.77 0 0 0 .162-.817q-.019-.044-.044-.083a.8.8 0 0 0-.118-.16zM11 3.25a.25.25 0 0 1 .25.25v2.75a.25.25 0 0 1-.25.25H3.5a.25.25 0 0 1-.25-.25V6A2.75 2.75 0 0 1 6 3.25zm7 0A2.75 2.75 0 0 1 20.75 6v.25a.25.25 0 0 1-.25.25H13a.25.25 0 0 1-.25-.25V3.5a.25.25 0 0 1 .25-.25z"
        />
      </svg>
    );
  },
);
export default SvgTableCellsMergeFill;
