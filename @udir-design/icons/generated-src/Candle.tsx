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
const SvgCandle = forwardRef<
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
          d="M12.564 2.002A.75.75 0 0 0 11.444 2L10.04 3.571A2.74 2.74 0 0 0 9.25 5.5a2.75 2.75 0 1 0 4.711-1.928zm-1.42 2.584.858-.96.852.958.03.032c.244.244.366.563.366.884s-.122.64-.366.884a1.25 1.25 0 1 1-1.74-1.798M5 9.25A1.75 1.75 0 0 0 3.25 11v1H4c-.75 0-.75.002-.75.002v.045l.006.092a3.207 3.207 0 0 0 .323 1.196c.144.288.357.592.671.846V20c0 .966.784 1.75 1.75 1.75h12A1.75 1.75 0 0 0 19.75 20v-2.361a3.6 3.6 0 0 0 .546-.804 4.4 4.4 0 0 0 .453-1.776v-.038l.001-.013V11A1.75 1.75 0 0 0 19 9.25zm.75 5.491q.122.009.25.009c.631 0 1.155-.16 1.572-.438.413-.276.68-.638.849-.977a3.2 3.2 0 0 0 .328-1.288v-.03l.001-.01V12a.75.75 0 0 0-1.5-.006v.004l-.002.028v.007a1.71 1.71 0 0 1-.169.632c-.08.16-.19.299-.339.399-.145.096-.371.186-.74.186s-.595-.09-.74-.187c-.15-.1-.259-.237-.34-.398a1.7 1.7 0 0 1-.17-.667V11a.25.25 0 0 1 .25-.25h14a.25.25 0 0 1 .25.25v4.009l-.004.066a2.938 2.938 0 0 1-.292 1.09c-.143.286-.346.549-.636.742-.285.19-.7.343-1.318.343s-1.033-.152-1.318-.343a1.9 1.9 0 0 1-.636-.742 2.9 2.9 0 0 1-.296-1.156V14a.75.75 0 0 0-1.5 0v2.103c0 .676-.06 1.243-.25 1.625a.86.86 0 0 1-.323.37c-.132.08-.339.152-.677.152-.351 0-.562-.076-.692-.158a.87.87 0 0 1-.322-.388c-.19-.409-.236-1.002-.236-1.704a.75.75 0 0 0-1.5 0c0 .687.03 1.593.377 2.338.183.392.462.76.88 1.023s.92.389 1.493.389c.556 0 1.045-.12 1.456-.37s.695-.601.885-.981q.116-.234.192-.484.146.127.317.24c.558.372 1.269.595 2.15.595a4.3 4.3 0 0 0 1.25-.174V20a.25.25 0 0 1-.25.25H6a.25.25 0 0 1-.25-.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCandle;
