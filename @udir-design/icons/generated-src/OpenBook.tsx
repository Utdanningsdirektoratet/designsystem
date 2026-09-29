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
const SvgOpenBook = forwardRef<
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
          d="M6.586 3.75c1.895 0 3.756.478 5.414 1.386a11.3 11.3 0 0 1 5.416-1.386h1.085a.75.75 0 0 1 .75.75l-.001.018v.732h1.751a.75.75 0 0 1 .75.75l-.001.019V19.5a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.751-.75V6c0-.388.297-.708.675-.746L3 5.25h1.75V4.5a.75.75 0 0 1 .75-.75zm-2.836 15h7.138a9.8 9.8 0 0 0-4.302-1H5.5A.75.75 0 0 1 4.75 17V6.75h-1zm15.5-1.77.001.02a.75.75 0 0 1-.75.75h-1.085a9.8 9.8 0 0 0-4.303 1h7.137v-12h-1zM17.416 5.25c-1.632 0-3.236.41-4.666 1.187v10.825a11.3 11.3 0 0 1 4.666-1.012h.334v-11zM6.25 5.98l.001.02-.001.019V16.25h.336c1.614 0 3.204.347 4.664 1.01V6.437A9.8 9.8 0 0 0 6.586 5.25H6.25z"
        />
      </svg>
    );
  },
);
export default SvgOpenBook;
