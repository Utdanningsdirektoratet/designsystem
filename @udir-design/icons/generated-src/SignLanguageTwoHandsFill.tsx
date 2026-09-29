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
const SvgSignLanguageTwoHandsFill = forwardRef<
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
          d="M18.584 14.791c.755-.25 1.539.165 1.815.894.271.719-.018 1.555-.708 1.914l-5.278 2.75c-.19.1-.402.15-.617.15H5A1.5 1.5 0 0 1 3.5 19v-2.762c0-1.819 1.45-3.26 3.156-3.26.254 0 .584-.076.876-.166a6 6 0 0 0 .445-.158q.018-.006.026-.01.005-.001.005-.002l.015-.006 2.663-1.038c.765-.298 1.59.112 1.874.864.263.697-.004 1.507-.658 1.879l-1.97 1.116c-.168.096-.236.28-.189.477.047.195.18.306.354.306h4.116zM9.938 2.85c.933.49 1.528 1.536 1.04 2.5l-.42.825a.5.5 0 0 0-.041.329l.227 1.08v.002c.11.54.15.982.099 1.37-.054.402-.2.717-.407 1.006a2 2 0 0 1-.209.236.03.03 0 0 0-.005.029l.305.633q-.056.018-.114.04l-2.662 1.037-.02.007-.016.008-.018.007a5 5 0 0 1-.387.137c-.273.084-.515.132-.654.133-.502 0-.983.1-1.427.28v-1.946c0-.297.053-.593.157-.872l1.42-3.82q.118-.314.312-.585C7.462 4.805 8.29 3.65 8.7 3.083l.063-.076a.9.9 0 0 1 .537-.272c.211-.029.438.009.638.114m11.583 3.44c.213.368.303.822.2 1.27-.107.458-.405.868-.895 1.15l-5.584 3.225-.06.032c.388.287.923.336 1.367.08l4.653-2.687q.146-.085.279-.186c.196.148.36.334.479.54.212.369.303.824.2 1.272-.107.458-.406.868-.895 1.15l-3.973 2.294-3.202 1.06h-2.695l.876-.497c.931-.528 1.327-1.623 1.053-2.603l-.063-.193-.088-.204a2.22 2.22 0 0 0-1.864-1.24l-.21-.436c.24-.354.42-.759.487-1.264.066-.506.011-1.04-.107-1.618l-.001-.007-.195-.923 4.734-2.734c.49-.282.994-.336 1.444-.198.44.134.788.439 1 .808.213.368.303.822.2 1.27-.106.458-.405.869-.894 1.151l-3.934 2.272-.057.053c.386.275.912.32 1.35.067l3.016-1.742c.655-.378 1.094-.956 1.25-1.632q.035-.154.048-.307a1.72 1.72 0 0 1 1.08-.032c.44.134.788.44 1.001.808"
        />
      </svg>
    );
  },
);
export default SvgSignLanguageTwoHandsFill;
