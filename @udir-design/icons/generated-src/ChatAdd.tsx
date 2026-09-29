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
const SvgChatAdd = forwardRef<
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
          d="M18 3.25A2.75 2.75 0 0 1 20.75 6v9A2.75 2.75 0 0 1 18 17.75H9.208l-4.822 2.894A.75.75 0 0 1 3.25 20V6A2.75 2.75 0 0 1 6 3.25zM6 4.75c-.69 0-1.25.56-1.25 1.25v12.676l3.864-2.32A.75.75 0 0 1 9 16.25h9c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25z"
        />
        <path
          fill="currentColor"
          d="M11.995 6.5a.75.75 0 0 1 .75.75v2.495h2.505a.75.75 0 0 1 0 1.5h-2.505v2.505a.75.75 0 0 1-1.5 0v-2.505H8.75a.75.75 0 0 1 0-1.5h2.495V7.25a.75.75 0 0 1 .75-.75"
        />
      </svg>
    );
  },
);
export default SvgChatAdd;
