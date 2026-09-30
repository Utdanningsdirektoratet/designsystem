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
const SvgMicrophoneSlash = forwardRef<
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
          d="M8.422 5.376A3.751 3.751 0 0 1 15.75 6.5v4.965a.75.75 0 1 1-1.5 0V6.5a2.25 2.25 0 0 0-4.397-.675.75.75 0 1 1-1.431-.449M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06m4.522 7.047a.75.75 0 1 0-1.338.678c.36.71.938 1.288 1.647 1.649a.75.75 0 0 0 .68-1.337 2.26 2.26 0 0 1-.989-.99M17 9.75a.75.75 0 0 1 .75.75v1c0 .674-.116 1.322-.33 1.924a.75.75 0 0 1-1.414-.502 4.2 4.2 0 0 0 .244-1.422v-1a.75.75 0 0 1 .75-.75m-9.25.75a.75.75 0 0 0-1.5 0v1c0 2.889 2.13 5.28 4.905 5.688v2.562h-1.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5h-1.25v-2.537q.185-.021.365-.053a.75.75 0 0 0-.265-1.477A4.25 4.25 0 0 1 7.75 11.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMicrophoneSlash;
