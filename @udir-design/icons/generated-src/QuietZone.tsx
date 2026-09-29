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
const SvgQuietZone = forwardRef<
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
          d="M4 3.25a.75.75 0 0 0-.75.75v16c0 .414.336.75.75.75h16a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.75-.75zm3.333 12.644a2.75 2.75 0 0 0-2.083 2.668v.688h-.5V4.75h9.253l-1.333 2.4a1.75 1.75 0 0 0 1.53 2.6h1.05V14A2.75 2.75 0 0 0 18 16.75h1.25v2.5h-5.5V12.5a2.25 2.25 0 0 0-4.5 0v2.914zm.364 1.455a1.25 1.25 0 0 0-.947 1.213v.688h5.5V12.5a.75.75 0 0 0-1.5 0V16a.75.75 0 0 1-.568.728zM18.75 12a.75.75 0 0 1-.75.75h-1.25V14c0 .69.56 1.25 1.25 1.25h1.25V4.75h-3.543a1 1 0 0 1-.051.114L13.98 7.88a.25.25 0 0 0 .219.371H16a.75.75 0 0 1 .75.75v2.25H18a.75.75 0 0 1 .75.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgQuietZone;
