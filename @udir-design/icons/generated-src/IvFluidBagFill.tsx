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
const SvgIvFluidBagFill = forwardRef<
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
          d="M12 3.75c-.409 0-.772.196-1 .5h2a1.25 1.25 0 0 0-1-.5m0-1.5c-1.259 0-2.32.846-2.646 2H7a.75.75 0 0 0-.75.75v14c0 .414.336.75.75.75h4.25V21a.75.75 0 0 0 1.5 0v-1.25H17a.75.75 0 0 0 .75-.75V5a.75.75 0 0 0-.75-.75h-2.354a2.75 2.75 0 0 0-2.646-2m0 6.5.646-.38a.75.75 0 0 0-1.292 0l-.007.01-.018.03-.065.114a36 36 0 0 0-.933 1.723 19 19 0 0 0-.716 1.558c-.186.47-.365 1.01-.365 1.445a2.75 2.75 0 1 0 5.5 0c0-.435-.18-.976-.365-1.445-.2-.504-.461-1.055-.716-1.558a37 37 0 0 0-.933-1.723l-.066-.113-.017-.03-.006-.01s0-.002-.647.379m-.331 2.175q.17-.335.331-.635.162.3.331.635c.245.484.484.989.66 1.432.188.478.259.776.259.893a1.25 1.25 0 1 1-2.5 0c0-.117.07-.415.26-.893.175-.443.414-.948.659-1.432"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgIvFluidBagFill;
