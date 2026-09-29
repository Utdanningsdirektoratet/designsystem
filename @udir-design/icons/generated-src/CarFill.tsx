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
const SvgCarFill = forwardRef<
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
          d="M8 5.25a2.75 2.75 0 0 0-2.2 1.1l-2.1 2.8a.5.5 0 0 1-.136.102 3 3 0 0 1-.173.092l-.032.017c-.06.03-.13.066-.199.103A1.75 1.75 0 0 0 2.25 11v3a1.75 1.75 0 0 0 1.22 1.668c.145.046.28-.071.293-.222a3.5 3.5 0 0 1 6.978.054c.01.138.12.25.259.25h2.5c.138 0 .25-.112.259-.25a3.5 3.5 0 0 1 6.906-.521c.037.164.215.263.352.165a1.75 1.75 0 0 0 .733-1.425v-1.526a1.75 1.75 0 0 0-1.136-1.639L17.538 9.4a.25.25 0 0 1-.112-.084L15.2 6.35a2.75 2.75 0 0 0-2.2-1.1zm-1 2a1.25 1.25 0 0 1 1-.5h.5a.25.25 0 0 1 .25.25v2a.25.25 0 0 1-.25.25H6a.25.25 0 0 1-.2-.4zm3.5-.5a.25.25 0 0 0-.25.25v2c0 .138.112.25.25.25H15a.25.25 0 0 0 .2-.4L14 7.25a1.25 1.25 0 0 0-1-.5zm-5.75 9a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0m10 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCarFill;
