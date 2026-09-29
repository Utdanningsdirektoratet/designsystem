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
const SvgSleepFill = forwardRef<
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
          d="M12.03 3.083c.7 0 1.383.077 2.04.22.153.034.126.228-.03.228a2.25 2.25 0 0 0-2.238 2.02l-.012.23c0 .457.138.882.373 1.237a.25.25 0 0 1 .005.28 2.251 2.251 0 0 0 1.872 3.498h1.844a2.25 2.25 0 0 0 2.249-2.25v-.001c0-.127.098-.237.224-.237h1.95c.121 0 .237.06.29.17a9.5 9.5 0 1 1-8.566-5.395m-1.082 9.54a.75.75 0 0 0-1.06 0c-.725.724-1.9.725-2.625 0a.75.75 0 0 0-1.06 1.06 3.356 3.356 0 0 0 4.745 0 .75.75 0 0 0 0-1.06m6.911 0a.75.75 0 0 0-1.06 0c-.725.725-1.9.725-2.625 0a.75.75 0 0 0-1.06 1.06 3.357 3.357 0 0 0 4.745 0 .75.75 0 0 0 0-1.06m-1.976-7.592a.75.75 0 0 1 .624 1.166L15.44 7.796h.442a.75.75 0 0 1 0 1.5H14.04a.75.75 0 0 1-.624-1.166l1.065-1.599h-.441a.75.75 0 0 1 0-1.5zm4.423-2.948a.751.751 0 0 1 .61 1.186L19.46 5.308h.846a.75.75 0 0 1 0 1.5h-2.304a.751.751 0 0 1-.61-1.186l1.457-2.039h-.847a.75.75 0 1 1 0-1.5z"
        />
      </svg>
    );
  },
);
export default SvgSleepFill;
