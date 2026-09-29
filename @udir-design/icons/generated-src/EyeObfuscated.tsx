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
const SvgEyeObfuscated = forwardRef<
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
          d="M21.03 5.03a.75.75 0 0 0-1.06-1.06l-3.311 3.31A10.9 10.9 0 0 0 12 6.25c-3.223 0-5.637 1.346-7.23 2.674a13 13 0 0 0-1.793 1.826 11 11 0 0 0-.574.79l-.032.05-.01.016-.002.005-.001.002s-.001.001.642.387l-.643-.386a.75.75 0 0 0 0 .772l.001.002.002.004.007.01.02.033.074.114q.097.147.282.398c.246.33.612.78 1.098 1.274.8.812 1.938 1.753 3.418 2.46l-3.29 3.289a.75.75 0 1 0 1.061 1.06l5.565-5.565.016-.015.005-.006 4.828-4.828.021-.02zm-7.116 4.995-3.889 3.889a2.75 2.75 0 0 1 .03-3.858 2.75 2.75 0 0 1 3.859-.03m.447-1.559q.331.221.614.499l.544-.545A9.4 9.4 0 0 0 12 7.75c-2.777 0-4.863 1.154-6.27 2.326A11.4 11.4 0 0 0 3.908 12l.037.05c.212.284.534.681.964 1.118.802.814 1.965 1.752 3.486 2.377l.57-.57a4.25 4.25 0 0 1-.99-4.341 4.25 4.25 0 0 1 6.386-2.168m5.17 1.004a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.061-1.06l7-7a.75.75 0 0 1 1.06 0m1.5 2.5a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.061-1.06l3-3a.75.75 0 0 1 1.06 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEyeObfuscated;
