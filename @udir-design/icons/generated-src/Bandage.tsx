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
const SvgBandage = forwardRef<
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
          d="M10.03 2.97c-.394-.395-.94-.375-1.278-.32-.383.065-.802.224-1.212.43-.828.413-1.768 1.087-2.57 1.89S3.493 6.712 3.08 7.54c-.206.41-.365.828-.429 1.212-.056.337-.076.883.319 1.278l11 11c.395.395.941.375 1.278.32.384-.065.802-.224 1.213-.43.828-.413 1.767-1.088 2.57-1.89s1.476-1.742 1.89-2.57c.205-.41.364-.829.428-1.212.057-.337.076-.883-.319-1.278zm-4 3.06c.698-.698 1.509-1.273 2.18-1.61.34-.17.61-.26.788-.29l.063-.008L10.94 6 6 10.94 4.122 9.06l.009-.063c.03-.18.12-.448.29-.788.336-.672.912-1.482 1.61-2.18M7.06 12 12 7.06 16.94 12 12 16.94zm6 6 1.879 1.878.063-.009c.18-.03.448-.12.788-.29.672-.336 1.482-.912 2.18-1.61.698-.697 1.273-1.507 1.61-2.18.17-.34.26-.608.29-.787l.008-.063L18 13.06zM9.129 4.12h-.012zm10.751 10.753.002.008v.003zm-5.006 5.006.009.001h.002zM4.12 9.127 4.12 9.12v-.003zM11.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75M10 11.25a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm3.25.75a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H14a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBandage;
