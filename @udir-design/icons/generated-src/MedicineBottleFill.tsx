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
const SvgMedicineBottleFill = forwardRef<
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
          d="M7 2.25a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h.25v1H6a.75.75 0 0 0-.75.75V21c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75V8.5a.75.75 0 0 0-.75-.75h-1.25v-1H17a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75zm8.25 5.5v-1h-6.5v1zm-2 3.75h-2.5a.25.25 0 0 0-.25.25v1.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h1.5a.25.25 0 0 1 .25.25v1.5c0 .138.112.25.25.25h2.5a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 0 .25-.25v-2.5a.25.25 0 0 0-.25-.25h-1.5a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 0-.25-.25"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMedicineBottleFill;
