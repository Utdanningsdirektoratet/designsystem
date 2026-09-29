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
const SvgArmchair = forwardRef<
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
          d="M15.84 3.25c.928 0 1.68.784 1.68 1.75v3.25h1.2c.928 0 1.68.784 1.68 1.75v6c0 .966-.752 1.75-1.68 1.75h-1.88l.643 2.013a.76.76 0 0 1-.456.949.715.715 0 0 1-.91-.475l-.797-2.487H8.68l-.796 2.487a.715.715 0 0 1-.911.475.76.76 0 0 1-.456-.95l.643-2.012H5.28c-.928 0-1.68-.784-1.68-1.75v-6c0-.966.752-1.75 1.68-1.75h1.2V5c0-.966.752-1.75 1.68-1.75zM5.28 9.75a.245.245 0 0 0-.24.25v6c0 .138.108.25.24.25h13.44c.132 0 .24-.112.24-.25v-6a.245.245 0 0 0-.24-.25H16.8a.245.245 0 0 0-.24.25v3c0 .414-.322.75-.72.75H8.16c-.397 0-.72-.336-.72-.75v-3a.246.246 0 0 0-.24-.25zm2.88-5a.245.245 0 0 0-.24.25v3.42c.567.28.96.882.96 1.58v2.25h6.24V10c0-.698.393-1.3.96-1.58V5a.245.245 0 0 0-.24-.25z"
        />
      </svg>
    );
  },
);
export default SvgArmchair;
