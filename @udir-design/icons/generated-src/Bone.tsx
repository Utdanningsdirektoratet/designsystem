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
const SvgBone = forwardRef<
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
          d="M5.167 16.418c1.165 0 2.17-.682 2.637-1.668h8.335A2.917 2.917 0 1 0 21.277 12a2.917 2.917 0 1 0-5.139-2.75H7.805A2.917 2.917 0 1 0 2.665 12a2.917 2.917 0 0 0 2.502 4.418m15.026-2.917a1.417 1.417 0 0 1-2.798.325.75.75 0 0 0-.803-.576H7.35a.75.75 0 0 0-.803.576 1.418 1.418 0 1 1-2.402-1.307.75.75 0 0 0 0-1.039 1.417 1.417 0 1 1 2.403-1.306.75.75 0 0 0 .8.576h9.247a.75.75 0 0 0 .8-.576 1.418 1.418 0 1 1 2.403 1.306.75.75 0 0 0 0 1.04c.245.255.395.6.395.98"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBone;
