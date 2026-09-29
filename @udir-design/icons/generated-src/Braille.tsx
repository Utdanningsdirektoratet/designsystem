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
const SvgBraille = forwardRef<
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
          d="M5.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m7.851 4.75a.506.506 0 0 0-.498.513V16a.75.75 0 0 1-1.287.524l-1.139-1.168a.39.39 0 0 0-.557-.002.42.42 0 0 0-.05.526l2.22 3.37h5.458l.699-2.358a1.25 1.25 0 0 0-.935-1.588l-2.811-.569a.75.75 0 0 1-.602-.735v-2.737a.506.506 0 0 0-.498-.513m-1.998.513c0-1.103.886-2.013 1.998-2.013s1.998.91 1.998 2.013v2.124l2.21.447c1.582.32 2.533 1.941 2.076 3.484l-.858 2.895a.75.75 0 0 1-.72.537h-6.422a.75.75 0 0 1-.626-.337l-2.443-3.708c-.497-.756-.4-1.761.237-2.405a1.89 1.89 0 0 1 2.55-.128zM7 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M17 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBraille;
