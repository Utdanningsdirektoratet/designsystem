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
const SvgEyeSlashFill = forwardRef<
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
          d="M21.03 5.03a.75.75 0 0 0-1.06-1.06l-16 16a.75.75 0 1 0 1.06 1.06zM11.031 17.71c-.206-.018-.291-.267-.145-.413l8.198-8.198a.247.247 0 0 1 .336-.013 13 13 0 0 1 1.603 1.665 10 10 0 0 1 .574.79l.046.074a.75.75 0 0 1 0 .772l-.046.075-.119.178c-.103.15-.255.36-.455.61-.4.5-.997 1.164-1.793 1.827-1.593 1.328-4.007 2.674-7.23 2.674q-.497 0-.969-.041m3.685-11.124a.242.242 0 0 1 .108.409l-.993.993a.26.26 0 0 1-.279.055 4.25 4.25 0 0 0-5.51 5.51.26.26 0 0 1-.055.279l-1.94 1.94a.246.246 0 0 1-.314.032 12.844 12.844 0 0 1-2.756-2.553 10 10 0 0 1-.606-.84.77.77 0 0 1-.014-.796l.047-.074q.041-.065.118-.179c.103-.15.255-.36.455-.61.4-.5.997-1.164 1.793-1.827C6.363 7.596 8.778 6.25 12 6.25c.98 0 1.886.125 2.716.335M12.05 9.25c.2.004.277.24.135.383l-2.552 2.552c-.142.142-.379.066-.383-.135V12a2.75 2.75 0 0 1 2.8-2.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEyeSlashFill;
