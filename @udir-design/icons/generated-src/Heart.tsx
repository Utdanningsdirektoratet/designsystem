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
const SvgHeart = forwardRef<
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
          d="M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.207 6.354-1 9.56l-6.5 6.5-.53-.53-.53.53-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.356 3.125 7.875 3.125c1.349 0 2.726.602 4.125 1.844M12 20.5l-.53.53a.75.75 0 0 0 1.06 0zm0-1.06 5.97-5.97c2.793-2.794 2.627-5.812 1-7.44-.919-.918-1.864-1.405-2.845-1.405s-2.177.487-3.595 1.905a.75.75 0 0 1-1.06 0C10.05 5.112 8.856 4.625 7.874 4.625S5.948 5.112 5.03 6.03c-1.627 1.628-1.793 4.646 1 7.44z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHeart;
