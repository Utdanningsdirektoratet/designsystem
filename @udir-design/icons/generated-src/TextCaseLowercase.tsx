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
const SvgTextCaseLowercase = forwardRef<
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
          d="M7.013 10.757a3.136 3.136 0 0 1 4.237 2.936V18a.75.75 0 0 1-1.49.12l-1.054.44a2.79 2.79 0 0 1-2.44-.144l-.08-.045c-1.852-1.042-1.861-3.706-.016-4.76.413-.237.881-.361 1.358-.361h2.158a1.63 1.63 0 0 0-.59-.866 1.64 1.64 0 0 0-1.556-.223l-.776.291a.75.75 0 0 1-.528-1.404zM13.5 4.25a.75.75 0 0 1 .75.75v6.59c.532-.508 1.22-.84 2-.84.971 0 1.8.513 2.363 1.244.561.73.887 1.707.887 2.756s-.326 2.026-.887 2.756c-.563.73-1.392 1.244-2.363 1.244-.78 0-1.468-.332-2-.842V18a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75m-5.972 10.5a1.237 1.237 0 0 0-.607 2.314l.081.045c.346.194.761.22 1.127.067L9.75 16.5v-1.75zm8.722-2.5c-.41 0-.83.214-1.173.66-.343.445-.577 1.094-.577 1.84s.234 1.395.577 1.84.764.66 1.173.66.83-.214 1.173-.66c.343-.445.577-1.094.577-1.84s-.234-1.395-.577-1.84-.763-.66-1.173-.66"
        />
      </svg>
    );
  },
);
export default SvgTextCaseLowercase;
