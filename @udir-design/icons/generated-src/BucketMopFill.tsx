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
const SvgBucketMopFill = forwardRef<
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
          d="M17 3.25a.75.75 0 0 1 .75.75v12.25H20a.75.75 0 0 1 .369 1.403l.827 2.069a.75.75 0 0 1-.696 1.028h-7a.75.75 0 0 1-.696-1.029l.827-2.068A.75.75 0 0 1 14 16.25h2.25V4a.75.75 0 0 1 .75-.75m-6.764 17.462a.75.75 0 0 0 .506-.606l.929-6.5a.75.75 0 0 0-.048-.39c-.143-.35-.423-.594-.683-.76a3.9 3.9 0 0 0-.942-.414c-.694-.213-1.567-.333-2.498-.333-.93 0-1.804.12-2.498.333a3.9 3.9 0 0 0-.942.415c-.26.165-.54.41-.683.76a.75.75 0 0 0-.048.39l.928 6.5a.75.75 0 0 0 .506.605l.077.024a13 13 0 0 0 .855.242c.51.127 1.21.272 1.805.272s1.294-.145 1.805-.272a15 15 0 0 0 .855-.242zm-4.581-7.296a.085.085 0 0 0 0 .168 7.7 7.7 0 0 0 1.845.207c.718 0 1.364-.082 1.865-.212a.08.08 0 0 0 0-.158A7.6 7.6 0 0 0 7.5 13.21c-.708 0-1.346.08-1.845.207"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBucketMopFill;
