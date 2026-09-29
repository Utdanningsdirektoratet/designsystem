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
const SvgCombifridge1Fill = forwardRef<
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
          d="M5.25 3A.75.75 0 0 1 6 2.25h12a.75.75 0 0 1 .75.75v8a.25.25 0 0 1-.25.25H8a.25.25 0 0 1-.25-.25v-.5A.75.75 0 0 0 7 9.75H5.5a.25.25 0 0 1-.25-.25zm.25 8.25a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25H6a.25.25 0 0 0 .25-.25v-1a.25.25 0 0 0-.25-.25zm0 3a.25.25 0 0 0-.25.25V21c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75v-8a.25.25 0 0 0-.25-.25H8a.25.25 0 0 0-.25.25v.5a.75.75 0 0 1-.75.75zm7.5-.31.53.53c.274.274.682.728 1.027 1.235.321.471.693 1.136.693 1.796a2.25 2.25 0 0 1-4.5 0c0-.66.372-1.325.693-1.796a9 9 0 0 1 1.027-1.235zm-.318 2.61c-.304.446-.432.782-.432.95a.75.75 0 0 0 1.5 0c0-.168-.128-.504-.432-.95-.1-.148-.21-.292-.318-.426a7 7 0 0 0-.318.426M13 4.25a.75.75 0 0 1 .75.75v.701l.607-.35a.75.75 0 0 1 .75 1.298L14.5 7l.607.351a.75.75 0 0 1-.75 1.3l-.607-.351V9a.75.75 0 0 1-1.5 0v-.7l-.607.35a.75.75 0 1 1-.75-1.3L11.5 7l-.607-.35a.75.75 0 0 1 .75-1.3l.607.35V5a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCombifridge1Fill;
