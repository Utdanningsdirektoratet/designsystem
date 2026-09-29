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
const SvgCogRotation = forwardRef<
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
          d="M14.523 2.582A9.75 9.75 0 0 0 4.956 5.26V3a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.4.375A8.25 8.25 0 0 1 20.25 12a.75.75 0 0 0 1.5 0 9.75 9.75 0 0 0-7.227-9.418M11.377 6.25a.75.75 0 0 0-.636.354l-.586.94-1.09-.253a.75.75 0 0 0-.7.2l-.873.873a.75.75 0 0 0-.2.7l.253 1.09-.941.587a.75.75 0 0 0-.354.636v1.246c0 .259.134.5.354.636l.94.586-.253 1.09a.75.75 0 0 0 .2.7l.873.874a.75.75 0 0 0 .7.2l1.09-.254.587.941a.75.75 0 0 0 .636.354h1.246a.75.75 0 0 0 .636-.354l.586-.94 1.09.253a.75.75 0 0 0 .7-.2l.874-.873a.75.75 0 0 0 .2-.7l-.254-1.09.941-.587a.75.75 0 0 0 .354-.636v-1.246a.75.75 0 0 0-.354-.636l-.94-.586.253-1.09a.75.75 0 0 0-.2-.7l-.873-.873a.75.75 0 0 0-.7-.2l-1.09.253-.587-.941a.75.75 0 0 0-.636-.354zm-.143 2.4.56-.9h.412l.56.9a.75.75 0 0 0 .374.305q.105.04.206.086a.75.75 0 0 0 .481.048l1.042-.242.284.284-.242 1.042a.75.75 0 0 0 .048.48q.046.102.086.207a.75.75 0 0 0 .306.374l.899.56v.412l-.9.56a.75.75 0 0 0-.305.374q-.04.105-.086.206a.75.75 0 0 0-.048.481l.242 1.042-.284.284-1.042-.242a.75.75 0 0 0-.48.048q-.102.046-.207.086a.75.75 0 0 0-.374.306l-.56.899h-.412l-.56-.9a.75.75 0 0 0-.374-.305 3 3 0 0 1-.206-.086.75.75 0 0 0-.481-.048l-1.042.242-.284-.284.242-1.042a.75.75 0 0 0-.048-.48 3 3 0 0 1-.086-.207.75.75 0 0 0-.306-.374l-.899-.56v-.412l.9-.56a.75.75 0 0 0 .305-.374 3 3 0 0 1 .086-.206.75.75 0 0 0 .048-.481L8.847 9.13l.284-.284 1.042.242a.75.75 0 0 0 .48-.048q.102-.046.207-.086a.75.75 0 0 0 .374-.306M3 11.25a.75.75 0 0 1 .75.75 8.25 8.25 0 0 0 15.395 4.125.75.75 0 0 1 1.4.375V21a.75.75 0 0 1-1.5 0v-2.259A9.749 9.749 0 0 1 2.25 12a.75.75 0 0 1 .75-.75m9-.25a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCogRotation;
