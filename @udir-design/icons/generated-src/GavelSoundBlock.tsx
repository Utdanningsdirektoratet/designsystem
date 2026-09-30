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
const SvgGavelSoundBlock = forwardRef<
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
          d="M11 3.25a.75.75 0 0 1 .53.22l4.5 4.5a.75.75 0 0 1 0 1.06l-.707.707a1.75 1.75 0 0 1-1.237.513h-.672a.25.25 0 0 0-.177.073l-.926.927 7.22 7.22a.75.75 0 1 1-1.061 1.06l-7.22-7.22-.927.927a.25.25 0 0 0-.073.177v.672c0 .464-.184.909-.513 1.237l-.707.707a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 .002-1.063l.708-.7a1.75 1.75 0 0 1 1.231-.507h.674a.25.25 0 0 0 .177-.073l2.915-2.924a.25.25 0 0 0 .073-.176v-.673c0-.464.184-.909.513-1.237l.707-.707a.75.75 0 0 1 .53-.22m0 1.81-.177.177a.25.25 0 0 0-.073.177v.673q0 .27-.08.522l2.22 2.221a1.8 1.8 0 0 1 .524-.08h.672a.25.25 0 0 0 .177-.073l.176-.177zM7.815 9.755 9.75 7.812 11.69 9.75 9.75 11.69zm-1.198.924a1.8 1.8 0 0 1-.532.082H5.41a.25.25 0 0 0-.176.073l-.172.17L8.5 14.439l.177-.176a.25.25 0 0 0 .073-.177v-.672q0-.27.08-.523zM5 16.75a1.75 1.75 0 0 0-1.75 1.75V20c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75v-1.5A1.75 1.75 0 0 0 13 16.75zm-.25 1.75a.25.25 0 0 1 .25-.25h8a.25.25 0 0 1 .25.25v.75h-8.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGavelSoundBlock;
