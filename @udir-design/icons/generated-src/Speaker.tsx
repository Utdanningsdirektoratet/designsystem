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
const SvgSpeaker = forwardRef<
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
          d="M15.825 4.324A.75.75 0 0 1 16.25 5v14a.75.75 0 0 1-1.219.586l-4.794-3.836H6.5a.75.75 0 0 1-.75-.75V9a.75.75 0 0 1 .75-.75h3.737l4.794-3.836a.75.75 0 0 1 .794-.09M14.75 6.56l-3.781 3.026a.75.75 0 0 1-.469.164H7.25v4.5h3.25a.75.75 0 0 1 .469.164l3.781 3.025z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSpeaker;
