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
const SvgSparkles = forwardRef<
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
          d="M13 1.75a.75.75 0 0 1 .68.433l.52 1.116 1.117.521a.75.75 0 0 1 0 1.36l-1.116.52-.521 1.117a.75.75 0 0 1-1.36 0l-.52-1.116-1.117-.521a.75.75 0 0 1 0-1.36l1.116-.52.521-1.117A.75.75 0 0 1 13 1.75m0 2.51a.75.75 0 0 1-.24.24.75.75 0 0 1 .24.24.75.75 0 0 1 .24-.24.75.75 0 0 1-.24-.24m-6-.01a.75.75 0 0 1 .68.433l1.157 2.48 2.48 1.157a.75.75 0 0 1 0 1.36l-2.48 1.157-1.157 2.48a.75.75 0 0 1-1.36 0l-1.157-2.48-2.48-1.157a.75.75 0 0 1 0-1.36l2.48-1.157 1.157-2.48A.75.75 0 0 1 7 4.25m0 2.523-.593 1.271a.75.75 0 0 1-.363.363L4.774 9l1.27.593a.75.75 0 0 1 .363.363L7 11.226l.593-1.27a.75.75 0 0 1 .363-.363L9.226 9l-1.27-.593a.75.75 0 0 1-.363-.363zm8.68 1.91a.75.75 0 0 0-1.36 0l-1.793 3.844-3.844 1.793a.75.75 0 0 0 0 1.36l3.844 1.794 1.793 3.843a.75.75 0 0 0 1.36 0l1.794-3.843 3.843-1.794a.75.75 0 0 0 0-1.36l-3.843-1.793zm-1.91 4.725L15 10.773l1.23 2.635a.75.75 0 0 0 .362.362L19.227 15l-2.635 1.23a.75.75 0 0 0-.362.362L15 19.227l-1.23-2.635a.75.75 0 0 0-.362-.362L10.773 15l2.635-1.23a.75.75 0 0 0 .362-.362"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSparkles;
