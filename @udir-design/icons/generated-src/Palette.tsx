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
const SvgPalette = forwardRef<
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
          d="M4.646 12a8.25 8.25 0 0 1 8.25-8.25c1.587 0 2.74.325 3.662.923.923.598 1.683 1.512 2.412 2.816.51 1.25.695 3.084-.62 4.297-.501.463-1.129.696-1.821.953h-.001l-.328.123c-.371.141-.807.32-1.147.598-.383.311-.657.755-.657 1.352q-.002.69.327 1.208c.215.339.506.569.792.735.28.162.583.28.844.375l.175.064c.204.074.383.139.558.216.152.068.352.312.317.735-.033.38-.278.911-1.03 1.336A8.25 8.25 0 0 1 4.647 12m8.25-9.75c-5.384 0-9.75 4.365-9.75 9.75s4.366 9.75 9.75 9.75a9.7 9.7 0 0 0 4.19-.945c1.143-.635 1.737-1.584 1.817-2.534.077-.912-.341-1.849-1.202-2.231-.228-.102-.471-.19-.681-.266h-.002l-.142-.052a4 4 0 0 1-.608-.264.8.8 0 0 1-.28-.243c-.044-.07-.091-.186-.091-.402 0-.078.012-.116.102-.19.132-.107.357-.215.735-.36l.282-.103c.676-.247 1.613-.59 2.352-1.271 2.036-1.88 1.574-4.567.97-6.015a1 1 0 0 0-.036-.075c-.8-1.443-1.714-2.598-2.928-3.385-1.221-.791-2.676-1.164-4.477-1.164M16.9 8.33a1.5 1.5 0 1 0-.776 2.897 1.5 1.5 0 0 0 .776-2.897m-9.081-.88a1.5 1.5 0 1 1 2.898.776 1.5 1.5 0 0 1-2.898-.777m6.106-2.506a1.5 1.5 0 1 0-.776 2.898 1.5 1.5 0 0 0 .776-2.898"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPalette;
