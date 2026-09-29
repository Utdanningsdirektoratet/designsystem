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
const SvgPuzzlePiece = forwardRef<
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
          d="M3.25 5A.75.75 0 0 1 4 4.25h4a.75.75 0 0 1 .75.75v.992q0 .007.002.027.003.047.021.14c.026.126.078.287.175.444.166.265.542.647 1.552.647s1.386-.382 1.552-.647a1.4 1.4 0 0 0 .198-.61V5a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v3.547c.346-.15.788-.297 1.25-.297 1.518 0 2.75 1.448 2.75 3.25s-1.232 3.25-2.75 3.25c-.462 0-.904-.147-1.25-.297V17a.75.75 0 0 1-.75.75h-3.547c.15.346.297.788.297 1.25 0 .718-.342 1.512-.873 2.119-.544.621-1.361 1.131-2.377 1.131s-1.833-.51-2.377-1.131c-.531-.607-.873-1.401-.873-2.119 0-.462.147-.904.297-1.25H4a.75.75 0 0 1-.75-.75zm13 11.25V13.5c0-.156.037-.507.365-.736a.9.9 0 0 1 .714-.13c.135.029.26.081.347.12.09.04.189.09.277.134l.007.004c.409.204.748.358 1.04.358.482 0 1.25-.552 1.25-1.75S19.482 9.75 19 9.75c-.292 0-.631.154-1.04.358l-.008.004c-.087.044-.185.093-.276.134a1.8 1.8 0 0 1-.347.12.9.9 0 0 1-.714-.13c-.328-.23-.365-.58-.365-.736V5.75h-2.5V6H13h.75v.021a1 1 0 0 1-.008.132 2.87 2.87 0 0 1-.419 1.245c-.459.734-1.333 1.352-2.823 1.352s-2.364-.618-2.823-1.352A2.9 2.9 0 0 1 7.25 6.02v-.019S7.25 6 8 6h-.75v-.25h-2.5v10.5H8.5c.156 0 .507.037.736.365a.9.9 0 0 1 .13.714c-.029.135-.081.26-.12.347-.04.09-.09.189-.134.277l-.004.007c-.204.409-.358.748-.358 1.04 0 .282.158.738.502 1.131.331.379.764.619 1.248.619s.917-.24 1.248-.619c.344-.393.502-.849.502-1.131 0-.292-.154-.631-.358-1.04l-.004-.008c-.044-.087-.093-.185-.134-.276a1.8 1.8 0 0 1-.12-.347.9.9 0 0 1 .13-.714c.23-.328.58-.365.736-.365z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPuzzlePiece;
