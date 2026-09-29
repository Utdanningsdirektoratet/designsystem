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
const SvgNotePencilFill = forwardRef<
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
          d="M18.293 8.707a.25.25 0 0 0 0-.353l-2.646-2.647a.25.25 0 0 0-.354 0l-3.626 3.626a1 1 0 0 0-.242.391l-1.267 3.802a.25.25 0 0 0 .316.316l3.802-1.267a1 1 0 0 0 .39-.242zm1.06-1.414a.25.25 0 0 0 .354 0L20.5 6.5a2.121 2.121 0 0 0-3-3l-.793.793a.25.25 0 0 0 0 .353zm-4.151-3.616a.25.25 0 0 0-.177-.427H5A1.75 1.75 0 0 0 3.25 5v14c0 .966.784 1.75 1.75 1.75h14A1.75 1.75 0 0 0 20.75 19V8.975a.25.25 0 0 0-.427-.177l-4.595 4.596a2.5 2.5 0 0 1-.978.604l-3.801 1.267c-1.368.456-2.67-.846-2.214-2.214l1.267-3.801a2.5 2.5 0 0 1 .604-.978z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgNotePencilFill;
