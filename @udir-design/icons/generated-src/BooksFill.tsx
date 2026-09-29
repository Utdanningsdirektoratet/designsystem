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
const SvgBooksFill = forwardRef<
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
          d="M19.67 16.335a.75.75 0 0 0-.032-.73l.016.025-.089-.177a3.25 3.25 0 0 1 0-2.906l.089-.177.014-.028a.75.75 0 0 0 .064-.505L17.82 3.23a1.25 1.25 0 0 0-1.22-.979H8.664A2.75 2.75 0 0 0 5.96 4.5l-1.64 8.88q-.07.3-.07.62v.032c.01.775.339 1.473.863 1.968A2.75 2.75 0 0 0 7 20.75h12a.75.75 0 0 0 .67-1.085l-.105-.212a3.25 3.25 0 0 1 0-2.906zm-1.78 2.915a4.75 4.75 0 0 1 0-2.5H7a1.25 1.25 0 1 0 0 2.5zM5.75 14.015a1.25 1.25 0 0 0 1.217 1.235H17.89a4.75 4.75 0 0 1 0-2.5H7a1.25 1.25 0 0 0-1.213.947l-.028.15A1 1 0 0 0 5.75 14zM9.47 5a.25.25 0 0 0-.247.219l-.188 1.5A.25.25 0 0 0 9.283 7h5.434a.25.25 0 0 0 .248-.281l-.188-1.5A.25.25 0 0 0 14.53 5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBooksFill;
