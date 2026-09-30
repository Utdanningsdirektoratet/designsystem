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
const SvgSpeakerSoundWave2 = forwardRef<
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
          d="M12.325 4.324A.75.75 0 0 1 12.75 5v14a.75.75 0 0 1-1.219.586L6.738 15.75H3a.75.75 0 0 1-.75-.75V9A.75.75 0 0 1 3 8.25h3.737l4.794-3.836a.75.75 0 0 1 .794-.09M11.25 6.56 7.469 9.586A.75.75 0 0 1 7 9.75H3.75v4.5H7a.75.75 0 0 1 .469.164l3.781 3.025zm4.46.665a.75.75 0 0 1 1.06 0A6.73 6.73 0 0 1 18.75 12a6.73 6.73 0 0 1-1.98 4.775.75.75 0 1 1-1.06-1.061A5.23 5.23 0 0 0 17.25 12c0-1.45-.587-2.763-1.54-3.714a.75.75 0 0 1 0-1.06m-.836 1.832a.75.75 0 1 0-1.06 1.061 2.65 2.65 0 0 1 .78 1.882c0 .735-.298 1.4-.78 1.882a.75.75 0 1 0 1.06 1.061A4.15 4.15 0 0 0 16.094 12a4.15 4.15 0 0 0-1.22-2.943"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSpeakerSoundWave2;
