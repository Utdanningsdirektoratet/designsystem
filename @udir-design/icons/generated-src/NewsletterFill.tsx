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
const SvgNewsletterFill = forwardRef<
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
          d="M13.007 14.502c.264 0 .518.105.706.292l5.789 5.777a.25.25 0 0 1-.177.426H4.653a.25.25 0 0 1-.177-.427l5.73-5.772a1 1 0 0 1 .708-.296zm7.991 4.843a.25.25 0 0 1-.426.177l-5.409-5.385a.25.25 0 0 1 .046-.39l5.408-3.326a.25.25 0 0 1 .381.213zM8.712 13.747a.25.25 0 0 1 .045.388l-5.328 5.362a.25.25 0 0 1-.427-.176v-8.673a.25.25 0 0 1 .382-.213zm9.536-10.745a.75.75 0 0 1 .75.75V7.36c0 .07.029.136.08.183l1.096 1.018a.25.25 0 0 1-.04.396l-6.361 3.899a1 1 0 0 1-.523.147h-2.58a1 1 0 0 1-.526-.149L3.856 8.961a.25.25 0 0 1-.039-.396l1.101-1.023a.25.25 0 0 0 .08-.183V3.752a.75.75 0 0 1 .75-.75zm-9.252 6a.75.75 0 0 0 0 1.5h4a.75.75 0 1 0 0-1.5zm0-3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z"
        />
      </svg>
    );
  },
);
export default SvgNewsletterFill;
