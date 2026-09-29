import React, {
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
const SvgBooks = forwardRef<
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
          d="M8.506 4.907a.75.75 0 0 1 .744-.657h5.5a.75.75 0 0 1 .744.657l.25 2A.75.75 0 0 1 15 7.75H9a.75.75 0 0 1-.744-.843zm1.406.843-.062.5h4.3l-.062-.5z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8.665 2.25a2.75 2.75 0 0 0-2.704 2.252l-1.62 8.794A2.76 2.76 0 0 0 5.113 16 2.75 2.75 0 0 0 7 20.75h12a.75.75 0 0 0 .67-1.085l-.105-.212a3.25 3.25 0 0 1 0-2.906l.104-.209.002-.003a.75.75 0 0 0 0-.67l-.002-.003-.104-.209a3.25 3.25 0 0 1 0-2.906l.106-.212a.75.75 0 0 0 .061-.498L17.82 3.23a1.25 1.25 0 0 0-1.22-.979zm7.733 1.5H8.665c-.603 0-1.12.43-1.23 1.024L6.224 11.36q.37-.11.777-.111h11.065zm1.492 11.5a4.75 4.75 0 0 1 0-2.5H7a1.25 1.25 0 1 0 0 2.5zm0 4a4.75 4.75 0 0 1 0-2.5H7a1.25 1.25 0 1 0 0 2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBooks;
