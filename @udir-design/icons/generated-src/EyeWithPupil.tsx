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
const SvgEyeWithPupil = forwardRef<
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
          d="M3.905 12q.103.14.243.317c.35.438.878 1.025 1.582 1.61C7.136 15.098 9.222 16.25 12 16.25s4.864-1.152 6.27-2.323A11.3 11.3 0 0 0 20.095 12a11.28 11.28 0 0 0-1.825-1.927C16.864 8.902 14.778 7.75 12 7.75s-4.864 1.152-6.27 2.323A11.3 11.3 0 0 0 3.905 12M12 7.75a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5M4.77 8.92C6.364 7.593 8.778 6.25 12 6.25s5.636 1.343 7.23 2.67a12.8 12.8 0 0 1 1.793 1.826 10 10 0 0 1 .576.796l.035.056.007.012.007.012.012.022.016.03c.004.01.015.033.02.048.013.032.046.17.054.278a1.4 1.4 0 0 1-.053.278l-.021.047q-.012.024-.016.031l-.008.015-.004.007-.009.015-.005.009a4 4 0 0 1-.155.238c-.104.152-.255.363-.456.614-.4.5-.997 1.163-1.793 1.826-1.594 1.327-4.008 2.67-7.23 2.67s-5.636-1.343-7.23-2.67a12.8 12.8 0 0 1-1.793-1.826 10 10 0 0 1-.576-.796l-.05-.08-.011-.022a1 1 0 0 1-.037-.078A1.4 1.4 0 0 1 2.25 12c.008-.108.041-.246.053-.278l.037-.078.012-.022.05-.08q.04-.069.12-.182a10 10 0 0 1 .455-.614c.4-.5.997-1.163 1.793-1.826m7.23.33a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5m0 1.25a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgEyeWithPupil;
