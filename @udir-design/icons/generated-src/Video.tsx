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
const SvgVideo = forwardRef<
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
          d="M4 5.25A1.75 1.75 0 0 0 2.25 7v10c0 .966.784 1.75 1.75 1.75h11A1.75 1.75 0 0 0 16.75 17v-1.572l4.021 1.286A.75.75 0 0 0 21.75 16V8a.75.75 0 0 0-.979-.714L16.75 8.573V7A1.75 1.75 0 0 0 15 5.25zm16.25 3.777-3.5 1.12v3.705l3.5 1.12zM15 17.25a.25.25 0 0 0 .25-.25V7a.25.25 0 0 0-.25-.25H4a.25.25 0 0 0-.25.25v10c0 .138.112.25.25.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgVideo;
