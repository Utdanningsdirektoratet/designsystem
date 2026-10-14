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
const SvgArrowsAllDirections = forwardRef<
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
          d="M14.263 6.194 12 3.93 9.737 6.194a.8.8 0 1 1-1.131-1.131l2.828-2.829a.8.8 0 0 1 1.132 0l2.828 2.829a.8.8 0 1 1-1.131 1.13M17.806 14.263 20.07 12l-2.263-2.263a.8.8 0 1 1 1.131-1.131l2.829 2.829a.8.8 0 0 1 0 1.13l-2.829 2.829a.8.8 0 1 1-1.13-1.131M14.263 17.806 12 20.07l-2.263-2.263a.8.8 0 1 0-1.131 1.131l2.828 2.829a.8.8 0 0 0 1.132 0l2.828-2.829a.8.8 0 1 0-1.131-1.13M6.194 14.263 3.93 12l2.263-2.263a.8.8 0 1 0-1.131-1.131l-2.829 2.829a.8.8 0 0 0 0 1.13l2.829 2.829a.8.8 0 1 0 1.13-1.131"
        />
        <path
          fill="currentColor"
          d="M12.75 19.633a.75.75 0 0 1-1.5 0v-16a.75.75 0 0 1 1.5 0z"
        />
        <path
          fill="currentColor"
          d="M4.367 12.75a.75.75 0 0 1 0-1.5h16a.75.75 0 1 1 0 1.5z"
        />
      </svg>
    );
  },
);
export default SvgArrowsAllDirections;
