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
const SvgCutleryFill = forwardRef<
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
          d="M20.439 3.392A.75.75 0 0 1 20.75 4v16a.75.75 0 0 1-1.5 0v-6.25H19A2.75 2.75 0 0 1 16.25 11V7.883a4.75 4.75 0 0 1 3.248-4.506l.265-.089a.75.75 0 0 1 .675.104M4 3.25a.75.75 0 0 1 .75.75v3.25a.25.25 0 0 0 .5 0V4a.75.75 0 0 1 1.5 0v3.25a.25.25 0 0 0 .5 0V4a.75.75 0 0 1 1.5 0v5c0 1.259-.846 2.32-2 2.646V20a.75.75 0 0 1-1.5 0v-8.353A2.75 2.75 0 0 1 3.25 9V4A.75.75 0 0 1 4 3.25m6.515 1.428c.38-.728 1.015-1.428 1.985-1.428.957 0 1.596.667 1.983 1.4.39.736.629 1.707.76 2.742.133.814.149 1.84-.205 2.705a2.63 2.63 0 0 1-.916 1.181q-.388.271-.872.388V20a.75.75 0 0 1-1.5 0v-8.334a2.5 2.5 0 0 1-.872-.388 2.63 2.63 0 0 1-.916-1.181c-.354-.866-.338-1.893-.204-2.707.13-1.002.37-1.97.757-2.712"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCutleryFill;
