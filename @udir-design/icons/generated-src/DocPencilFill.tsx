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
const SvgDocPencilFill = forwardRef<
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
          d="M12.031 11.587a.25.25 0 0 1 .033-.11l2.985-5.17a.25.25 0 0 1 .341-.092l3.032 1.75a.25.25 0 0 1 .091.341l-2.985 5.17a.25.25 0 0 1-.079.084l-3.265 2.156a.25.25 0 0 1-.387-.223zm4.11-6.671a.25.25 0 0 1-.092-.342l.486-.84a2 2 0 1 1 3.464 2l-.486.84a.25.25 0 0 1-.341.092zm-5.604 6.522a1.5 1.5 0 0 1 .198-.66l4.13-7.153a.25.25 0 0 0-.216-.375H5.5c-.69 0-1.25.56-1.25 1.25v16c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25v-8.67c0-.257-.339-.347-.466-.126l-1.486 2.574a1.5 1.5 0 0 1-.473.501l-3.732 2.465a1.5 1.5 0 0 1-2.324-1.342z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDocPencilFill;
