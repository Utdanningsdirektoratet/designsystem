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
const SvgBacteriaFill = forwardRef<
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
          d="M11.78 2.317a.75.75 0 0 1 .993.373l.19.419a4.7 4.7 0 0 1 2.138.036c.885.226 1.574.611 2.093 1.143l.74-.476a.75.75 0 1 1 .812 1.261l-.734.472c.265.635.396 1.335.463 2.049.064.666.075 1.38.075 2.107 0 .458-.018 1.03-.071 1.671l1.09.172a.75.75 0 0 1-.234 1.482l-1.037-.164c-.088.549-.205 1.121-.36 1.696a14 14 0 0 1-.4 1.246l1.07.408a.75.75 0 1 1-.535 1.402l-1.16-.442a8.2 8.2 0 0 1-1.216 1.697 6.5 6.5 0 0 1-1.972 1.444l.167.394a.75.75 0 0 1-1.38.586l-.212-.499a8 8 0 0 1-1.682.175q-.467 0-.897-.018c-.997-.04-1.843-.151-2.552-.322a7 7 0 0 1-1.182-.392l-.823 1.19a.75.75 0 0 1-1.234-.854l.823-1.189a2.36 2.36 0 0 1-.619-1.97c.069-.487.272-.95.552-1.366l-.534-.33a.75.75 0 0 1 .79-1.276l.76.471.05-.048c.346-.34.673-.662.991-1.009.522-.57.975-1.165 1.32-1.893.167-.35.311-.737.426-1.172l-1.002-.17a.75.75 0 1 1 .25-1.48l1 .17q.012-.14.02-.285a10 10 0 0 1 .145-1.22q.151-.81.421-1.48l-.711-.38a.75.75 0 0 1 .706-1.324l.73.39a5 5 0 0 1 1.512-1.365l-.153-.337a.75.75 0 0 1 .373-.993M10.732 16.03a.552.552 0 1 1 1.103 0 .552.552 0 0 1-1.103 0m.551-2.051a2.052 2.052 0 1 0 0 4.103 2.052 2.052 0 0 0 0-4.103m1.7-6.205a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0m.75-2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBacteriaFill;
