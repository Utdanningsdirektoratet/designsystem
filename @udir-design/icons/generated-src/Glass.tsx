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
const SvgGlass = forwardRef<
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
          d="M6.5 3.25a.75.75 0 0 0-.749.797l.883 14.125A2.75 2.75 0 0 0 9.38 20.75h5.242a2.75 2.75 0 0 0 2.745-2.578l.883-14.125a.75.75 0 0 0-.749-.797zm.955 4-.157-2.5h9.404l-.157 2.5zm.093 1.5.583 9.328A1.25 1.25 0 0 0 9.38 19.25h5.242a1.25 1.25 0 0 0 1.248-1.172l.583-9.328z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgGlass;
