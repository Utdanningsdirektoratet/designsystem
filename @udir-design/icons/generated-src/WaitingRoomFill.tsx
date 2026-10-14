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
const SvgWaitingRoomFill = forwardRef<
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
          d="M8 3.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5M8.75 6a.75.75 0 0 0-1.5 0v2c0 .199.079.39.22.53l1 1a.75.75 0 0 0 1.06-1.06l-.78-.78zm7 0a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0m5.478 4.182a.75.75 0 0 0-1.456-.364l-1.12 4.485a1.25 1.25 0 0 1-1.214.947H14a.75.75 0 0 0 0 1.5h1.25V20a.75.75 0 0 0 1.5 0v-3.25h.688a2.75 2.75 0 0 0 2.668-2.083zm-3.022-1.403a.75.75 0 0 1 .515.927l-.822 2.877a1.75 1.75 0 0 1-1.435 1.251l-2.858.408a.75.75 0 1 1-.212-1.485l2.858-.408a.25.25 0 0 0 .205-.179l.822-2.876a.75.75 0 0 1 .927-.515m-5.563 6.607a.75.75 0 1 0-1.286-.772l-3 5a.75.75 0 0 0 1.286.772z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgWaitingRoomFill;
