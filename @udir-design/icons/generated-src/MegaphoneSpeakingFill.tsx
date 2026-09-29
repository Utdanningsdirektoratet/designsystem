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
const SvgMegaphoneSpeakingFill = forwardRef<
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
          d="M19.03 6.03a.75.75 0 0 0-1.06-1.06l-1.5 1.5a.75.75 0 0 0 1.06 1.06zm-4.743-.723A.75.75 0 0 1 14.75 6v12a.75.75 0 0 1-1.28.53l-.615-.614a7.26 7.26 0 0 0-3.89-2.017.256.256 0 0 1-.215-.251V8.352c0-.125.091-.23.214-.251a7.3 7.3 0 0 0 3.891-2.017l.615-.614a.75.75 0 0 1 .817-.163M6 15.75a3.75 3.75 0 1 1 0-7.5h1a.25.25 0 0 1 .25.25v7a.25.25 0 0 1-.25.25zm-.46.978a.26.26 0 0 0-.29.256V19c0 .414.336.75.75.75h2a.75.75 0 0 0 .75-.75v-1.985a.16.16 0 0 0-.137-.16l-.432-.061a4 4 0 0 0-.614-.044H6q-.232 0-.46-.022M18.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75m-.72 4.47a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 1 0 1.06-1.06z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMegaphoneSpeakingFill;
