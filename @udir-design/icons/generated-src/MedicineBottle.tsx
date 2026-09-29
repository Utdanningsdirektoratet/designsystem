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
const SvgMedicineBottle = forwardRef<
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
          d="M6.25 3A.75.75 0 0 1 7 2.25h10a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-.25v1H18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V8.5A.75.75 0 0 1 6 7.75h1.25v-1H7A.75.75 0 0 1 6.25 6zm10 .75v1.5h-8.5v-1.5zm-1 4v-1h-6.5v1zm-8.5 12.5v-11h10.5v11zm3.75-9.5a.75.75 0 0 0-.75.75v1.25H8.5a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h1.25v1.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-1.25h1.25a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75h-1.25V11.5a.75.75 0 0 0-.75-.75zm.75 2.75v-1.25h1.5v1.25c0 .414.336.75.75.75h1.25v1.5H13.5a.75.75 0 0 0-.75.75v1.25h-1.5V16.5a.75.75 0 0 0-.75-.75H9.25v-1.5h1.25a.75.75 0 0 0 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMedicineBottle;
