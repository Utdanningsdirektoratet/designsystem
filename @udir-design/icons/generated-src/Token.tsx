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
const SvgToken = forwardRef<
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
          d="M11.625 2.35a.75.75 0 0 1 .75 0l7.794 4.5a.75.75 0 0 1 .375.65v9a.75.75 0 0 1-.375.65l-7.779 4.49a.75.75 0 0 1-.39.11h-.006a.76.76 0 0 1-.373-.103L3.83 17.15a.75.75 0 0 1-.375-.65V7.494a.75.75 0 0 1 .382-.648zm-.375 17.351-6.294-3.634V8.799l3.486 2.013a3.751 3.751 0 0 0 2.808 4.863zM15.75 12a3.75 3.75 0 0 1-3 3.675v4.026l6.294-3.634V8.799l-3.486 2.013c.124.373.192.773.192 1.188m-1.79-1.105a2.25 2.25 0 1 1-3.919-.003l.01-.017.01-.016a2.249 2.249 0 0 1 3.9.036m.847-1.382L18.294 7.5 12 3.866 5.706 7.5l3.487 2.013A3.74 3.74 0 0 1 12 8.25a3.74 3.74 0 0 1 2.807 1.263"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgToken;
