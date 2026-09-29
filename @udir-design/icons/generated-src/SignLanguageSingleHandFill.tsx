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
const SvgSignLanguageSingleHandFill = forwardRef<
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
          d="M14.417 20h-2.194a.94.94 0 0 1-.422-.1L8 18H6.75V8.156l2.588-2.91a1.329 1.329 0 1 1 1.986 1.765l2.068-2.327a1.389 1.389 0 1 1 2.02 1.905L14 8l3.622-2.173a1.369 1.369 0 0 1 1.489 2.295L15 11l2.049.256a2.68 2.68 0 0 1 2.303 2.179l.377 2.075a1.492 1.492 0 1 1-2.945.478l-.24-1.682a.394.394 0 0 0-.351-.337l-3.594-.359a1 1 0 0 0-1.099.995v.99c0 .515.388.948.9 1.005l2.192.244A1.583 1.583 0 0 1 14.417 20M5.25 9H3.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h1.75z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSignLanguageSingleHandFill;
