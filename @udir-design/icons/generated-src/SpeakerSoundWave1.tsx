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
const SvgSpeakerSoundWave1 = forwardRef<
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
          d="M12.75 5a.75.75 0 0 0-1.219-.586L6.738 8.25H3a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h3.737l4.794 3.836A.75.75 0 0 0 12.75 19zM7.469 9.586 11.25 6.56v10.88l-3.781-3.026A.75.75 0 0 0 7 14.25H3.75v-4.5H7a.75.75 0 0 0 .469-.164m7.405-.53a.75.75 0 1 0-1.06 1.062 2.65 2.65 0 0 1 .78 1.882c0 .735-.298 1.4-.78 1.882a.75.75 0 1 0 1.06 1.061A4.15 4.15 0 0 0 16.094 12a4.15 4.15 0 0 0-1.22-2.943"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSpeakerSoundWave1;
