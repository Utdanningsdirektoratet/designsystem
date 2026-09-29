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
const SvgFingerMobileFill = forwardRef<
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
          d="M8 2.25A2.75 2.75 0 0 0 5.25 5v14A2.75 2.75 0 0 0 8 21.75h2.111a.25.25 0 0 0 .208-.389L8.445 18.55a2.648 2.648 0 0 1 2.363-4.11c.155.008.295-.108.295-.264v-1.427a2.748 2.748 0 0 1 5.496 0v1.27c0 .119.085.221.201.245l1.405.28q.102.021.201.047c.17.044.344-.077.344-.252V5A2.75 2.75 0 0 0 16 2.25zm2.75 3.25a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m1.425 11.495a.25.25 0 0 0 .428-.176v-4.07a1.248 1.248 0 0 1 2.496 0v2.703l2.812.563a1.976 1.976 0 0 1 1.505 2.505l-.805 2.683a.25.25 0 0 1-.24.178H12.27a.25.25 0 0 1-.208-.111l-2.368-3.553a1.148 1.148 0 0 1 1.771-1.442z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgFingerMobileFill;
