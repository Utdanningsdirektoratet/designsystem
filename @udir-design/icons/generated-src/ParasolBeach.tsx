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
const SvgParasolBeach = forwardRef<
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
          d="M10.049 2.578a.75.75 0 0 0-1.45.389l.198.737a10.65 10.65 0 0 0-6.323 5.83c-.16.364-.19.77-.087 1.153l.427 1.595a.75.75 0 0 0 .918.53l2.415-.647a.75.75 0 0 0 .456-.35l.332-.575.575.332a.75.75 0 0 0 .57.075l2.655-.712 1.433 5.348c-3.962.317-5.77 2.865-6.579 4.004q-.106.151-.19.265a.75.75 0 0 0 1.203.896q.094-.128.204-.283C7.653 19.98 9.246 17.75 13 17.75c4.182 0 6.473 2.312 7.376 3.666a.75.75 0 1 0 1.248-.832c-1.041-1.562-3.535-4.064-7.906-4.314l-1.534-5.723 2.657-.712a.75.75 0 0 0 .455-.35l.332-.574.575.332a.75.75 0 0 0 .57.075l2.414-.647a.75.75 0 0 0 .53-.919l-.427-1.594a1.75 1.75 0 0 0-.651-.955 10.65 10.65 0 0 0-8.393-1.888zm7.7 3.834c-4.756-3.5-11.531-1.685-13.901 3.725a.25.25 0 0 0-.012.162l.233.87 1.39-.373.552-.955a.75.75 0 0 1 1.024-.275l.956.552 6.161-1.651.552-.956a.75.75 0 0 1 1.025-.274l.955.551 1.39-.372-.233-.87a.25.25 0 0 0-.091-.134"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgParasolBeach;
