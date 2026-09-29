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
const SvgKeyHorizontal = forwardRef<
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
          d="M16.986 7.226c-1.818 0-3.443.993-4.255 2.584H3.865a.75.75 0 0 0-.554.245l-.865.949a.75.75 0 0 0 .054 1.064l3.32 2.972a.75.75 0 0 0 1.043-.042l.648-.68 1.971 1.203a.75.75 0 0 0 .914-.103l1.721-1.675h.44c.909 1.886 2.486 3.03 4.429 3.03a4.76 4.76 0 0 0 4.764-4.77 4.757 4.757 0 0 0-4.764-4.777m-3.068 3.6c.487-1.28 1.686-2.1 3.068-2.1a3.257 3.257 0 0 1 3.264 3.277 3.26 3.26 0 0 1-3.264 3.27c-1.353 0-2.554-.829-3.242-2.558a.75.75 0 0 0-.697-.472h-1.235a.75.75 0 0 0-.523.212l-1.522 1.482-1.991-1.215a.75.75 0 0 0-.934.123l-.564.592-2.214-1.982.132-.145h9.021a.75.75 0 0 0 .701-.484m3.131-.326a1.501 1.501 0 1 0-.002 2.998 1.501 1.501 0 0 0 .002-2.998"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgKeyHorizontal;
