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
const SvgDogFill = forwardRef<
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
          d="m14.833 5.418-.07-.405-.012-.06c-.016-.087-.032-.173-.058-.257a4.651 4.651 0 0 0-.495-1.094C13.831 3.016 13.134 2.25 12 2.25H9c-1.085 0-1.9.711-2.377 1.256a6 6 0 0 0-.48.629.26.26 0 0 1-.211.115H4A1.75 1.75 0 0 0 2.25 6v1.94a3.31 3.31 0 0 0 3.31 3.31h1.828c.096 0 .168.088.15.183-.135.68-.31 1.63-.468 2.708-.313 2.134-.578 4.845-.314 6.952a.75.75 0 0 0 .744.657H19a.75.75 0 0 0 .576-1.23l-.002-.003-.017-.02q-.023-.03-.071-.092-.098-.125-.277-.38c-.236-.34-.565-.848-.926-1.51a20.2 20.2 0 0 1-2.048-5.662 355 355 0 0 1-.963-4.995.25.25 0 0 0-.367-.173l-.538.296c-1.124.639-2.566.952-3.685.62-.587-.174-1.132-.545-1.416-1.183-.276-.622-.242-1.36.023-2.155a.75.75 0 1 1 1.423.474c-.196.587-.146.912-.075 1.072.064.143.197.273.472.354.603.18 1.618.026 2.52-.488l.009-.005 1.133-.624a.25.25 0 0 0 .125-.263z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDogFill;
