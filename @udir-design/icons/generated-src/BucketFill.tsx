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
const SvgBucketFill = forwardRef<
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
          d="m18.742 19.61 2-13.5.008-.11c0-.705-.553-1.162-.997-1.424-.494-.292-1.159-.529-1.914-.718-1.523-.38-3.587-.608-5.839-.608s-4.316.227-5.839.608c-.755.19-1.42.426-1.914.718-.444.262-.997.719-.997 1.424l.008.11 2 13.5c.04.264.216.488.464.587l.04.015.096.036q.126.046.356.122c.306.1.748.23 1.302.36 1.105.26 2.664.52 4.484.52s3.379-.26 4.484-.52c.554-.13.995-.26 1.302-.36a11 11 0 0 0 .453-.158l.04-.016a.75.75 0 0 0 .463-.586M12 7.25c-2.166 0-4.102-.22-5.475-.563a8 8 0 0 1-.985-.305 4 4 0 0 1-.471-.219c-.137-.075-.137-.25 0-.326.126-.07.287-.148.471-.22a8 8 0 0 1 .985-.304C7.898 4.97 9.834 4.75 12 4.75s4.102.22 5.475.563q.555.14.95.291c.199.076.372.159.506.233.137.075.137.25 0 .326a4 4 0 0 1-.506.233q-.395.151-.95.29c-1.373.344-3.309.564-5.475.564"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBucketFill;
