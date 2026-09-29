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
const SvgUmbrella = forwardRef<
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
          d="M6 8.25c-.51 0-1.01.095-1.463.23a8.252 8.252 0 0 1 14.926 0A5.2 5.2 0 0 0 18 8.25c-.901 0-1.763.296-2.367.565a8 8 0 0 0-.633.314 8 8 0 0 0-.633-.314c-.604-.269-1.466-.565-2.367-.565s-1.763.296-2.367.565c-.249.11-.464.22-.633.314a8 8 0 0 0-.633-.314C7.763 8.546 6.901 8.25 6 8.25m8.37 2.245c.105.06.162.095.214.129.252.168.58.168.832 0a6.87 6.87 0 0 1 .826-.439c.52-.231 1.16-.435 1.758-.435.916 0 1.894.473 2.368.744a.75.75 0 0 0 1.1-.83C20.42 5.406 16.58 2.25 12 2.25S3.58 5.407 2.532 9.663a.75.75 0 0 0 1.1.83c.474-.27 1.452-.743 2.368-.743.599 0 1.237.204 1.758.435a7 7 0 0 1 .826.44.75.75 0 0 0 .832-.001 6.876 6.876 0 0 1 .826-.439c.52-.231 1.16-.435 1.758-.435s1.237.204 1.758.435c.254.113.465.226.612.31M12 11.25a.75.75 0 0 1 .75.75v6.995a1.71 1.71 0 0 0 .17.67c.081.16.19.299.34.399.145.096.371.186.74.186s.595-.09.74-.186c.15-.1.259-.238.34-.4a1.7 1.7 0 0 0 .17-.669V18.5a.75.75 0 0 1 1.5 0v.547a3.206 3.206 0 0 1-.328 1.288c-.17.34-.437.701-.85.976-.417.279-.94.439-1.572.439-.631 0-1.155-.16-1.572-.439a2.5 2.5 0 0 1-.849-.976A3.2 3.2 0 0 1 11.25 19v-7a.75.75 0 0 1 .75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgUmbrella;
