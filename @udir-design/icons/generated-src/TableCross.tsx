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
const SvgTableCross = forwardRef<
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
          d="M17 12.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5m1-9A2.75 2.75 0 0 1 20.75 6v5.499c0 .206-.238.326-.412.216a6 6 0 0 0-.929-.484.26.26 0 0 1-.159-.235v-.746A.25.25 0 0 0 19 10h-3.25a.25.25 0 0 0-.25.25v.485a.26.26 0 0 1-.19.246q-.484.136-.933.344c-.172.08-.377-.041-.377-.231v-.844a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h.844c.19 0 .31.204.231.377q-.207.45-.343.933a.26.26 0 0 1-.246.19h-.486a.25.25 0 0 0-.25.25V19c0 .138.112.25.25.25h.747c.103 0 .196.064.235.16q.204.486.484.928c.11.174-.01.412-.216.412H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25zM5 15.5a.25.25 0 0 0-.25.25V18c0 .69.56 1.25 1.25 1.25h2.25A.25.25 0 0 0 8.5 19v-3.25a.25.25 0 0 0-.25-.25zm13.944-.444a.75.75 0 0 0-1.06 0L17 15.94l-.884-.884a.75.75 0 1 0-1.06 1.06l.884.884-.884.884a.75.75 0 1 0 1.06 1.06l.884-.883.884.883a.75.75 0 1 0 1.06-1.06L18.061 17l.883-.884a.75.75 0 0 0 0-1.06M5 10a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h3.25a.25.25 0 0 0 .25-.25v-3.5a.25.25 0 0 0-.25-.25zm1-5.25c-.69 0-1.25.56-1.25 1.25v2.25c0 .138.112.25.25.25h3.25a.25.25 0 0 0 .25-.25V5a.25.25 0 0 0-.25-.25zm4.25 0A.25.25 0 0 0 10 5v3.25c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25V5a.25.25 0 0 0-.25-.25zm5.5 0a.25.25 0 0 0-.25.25v3.25c0 .138.112.25.25.25H19a.25.25 0 0 0 .25-.25V6c0-.69-.56-1.25-1.25-1.25z"
        />
      </svg>
    );
  },
);
export default SvgTableCross;
