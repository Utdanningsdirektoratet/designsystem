import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBoneBroken = forwardRef<
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
          d="M12.75 6.298a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0zm-5.953 10.12A1.417 1.417 0 0 0 7.8 14.681a.75.75 0 0 1 .53-.918l2.253-.604a.75.75 0 1 1 .388 1.45l-1.622.434a2.918 2.918 0 1 1-5.722-.797 2.917 2.917 0 1 1 4.557-3.55l1.622-.436a.75.75 0 1 1 .388 1.45l-2.252.603a.75.75 0 0 1-.919-.53 1.417 1.417 0 1 0-2.101 1.578.75.75 0 0 1 .269 1.004 1.417 1.417 0 0 0 1.608 2.052m11.916-5.636a1.417 1.417 0 0 0-1.735 1.001.75.75 0 0 1-.919.53l-2.252-.603a.75.75 0 1 1 .388-1.449l1.622.435a2.918 2.918 0 1 1 4.557 3.55 2.916 2.916 0 1 1-5.722.797l-1.622-.434a.75.75 0 0 1 .389-1.45l2.252.605a.75.75 0 0 1 .53.918 1.417 1.417 0 1 0 2.61-.316.75.75 0 0 1 .268-1.004 1.417 1.417 0 0 0-.366-2.58m-1.769-4.429a.75.75 0 0 1 0 1.06L15.53 8.829a.75.75 0 0 1-1.06-1.06l1.414-1.415a.75.75 0 0 1 1.06 0m-8.828 0a.75.75 0 0 0-1.06 1.06L8.47 8.829a.75.75 0 1 0 1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBoneBroken;
