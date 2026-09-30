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
const SvgPencilLine = forwardRef<
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
          d="M10.286 11.483a.75.75 0 0 1 .099-.33l4.5-7.795a2.75 2.75 0 0 1 4.763 2.75l-4.5 7.795a.75.75 0 0 1-.236.25l-3.732 2.465a.75.75 0 0 1-1.162-.671zm1.486.266-.167 2.79L13.937 13l3.028-5.243-2.165-1.25zm6.577-6.39-.634 1.097-2.165-1.25.634-1.098a1.25 1.25 0 0 1 2.165 1.25M6.5 9.75c-1.414 0-2.75 1.046-2.75 2.641 0 .463.112.915.198 1.261l.03.125c.097.4.145.675.11.926-.074.549-.287.989-.565 1.219a.75.75 0 1 0 .954 1.156c.675-.557.994-1.413 1.098-2.173.076-.56-.042-1.083-.139-1.481l-.03-.122c-.09-.374-.156-.641-.156-.91 0-.637.527-1.142 1.25-1.142.383 0 .624.116.789.267.176.161.318.412.4.752.17.703.034 1.585-.288 2.165l-1.535 2.763a4.9 4.9 0 0 0-.616 2.376c0 1.566 1.305 2.677 2.75 2.677 1.319 0 2.208-.68 2.634-1.63.4-.894.374-1.968.077-2.857a.75.75 0 1 0-1.422.474c.203.611.193 1.287-.023 1.769-.19.424-.552.744-1.266.744-.707 0-1.25-.527-1.25-1.177 0-.576.147-1.143.427-1.647l1.535-2.763c.501-.903.696-2.17.436-3.246-.133-.549-.396-1.094-.848-1.508-.463-.423-1.074-.66-1.8-.66"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPencilLine;
