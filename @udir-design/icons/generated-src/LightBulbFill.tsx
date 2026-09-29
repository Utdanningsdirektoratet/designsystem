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
const SvgLightBulbFill = forwardRef<
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
          d="M7.176 3.961C8.418 2.68 10.136 2 12 2s3.582.68 4.824 1.961A6.88 6.88 0 0 1 18.75 8.75c0 1.223-.476 2.126-1.114 3.148q-.195.311-.415.652c-.575.894-1.27 1.975-2.05 3.535a.75.75 0 0 1-.671.415h-5a.75.75 0 0 1-.67-.415c-.781-1.56-1.476-2.64-2.05-3.535a63 63 0 0 1-.416-.652C5.726 10.876 5.25 9.973 5.25 8.75c0-1.852.732-3.557 1.926-4.789M9.75 19.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75c0 .447-.201.983-.54 1.406-.357.446-.931.844-1.71.844s-1.354-.398-1.71-.844c-.339-.423-.54-.959-.54-1.406M10 17a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgLightBulbFill;
