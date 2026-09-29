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
const SvgSack = forwardRef<
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
          d="m8.966 5.769-.633-1.897c-.428-1.285.69-2.515 1.98-2.31.673.106 1.324.188 1.687.188s1.014-.082 1.687-.189c1.29-.204 2.408 1.026 1.98 2.31l-.633 1.898q.626.249 1.15.61c1.067.736 1.757 1.768 2.203 2.926.817 2.12.86 4.8.863 7.204.128.065.27.145.416.242.42.28 1.084.85 1.084 1.749 0 .77-.388 1.324-.72 1.655a3 3 0 0 1-.666.5l-.017.01-.007.003-.002.002h-.002L19 20l.335.67a.75.75 0 0 1-.335.08H5a.75.75 0 0 1-.335-.08h-.003l-.002-.002-.007-.003-.017-.01-.051-.027a3.029 3.029 0 0 1-.615-.472c-.332-.332-.72-.887-.72-1.656 0-.898.664-1.469 1.084-1.749.145-.097.289-.177.416-.242.002-2.404.046-5.085.863-7.204.446-1.158 1.136-2.19 2.204-2.926q.523-.361 1.149-.61m.79-2.371c-.057-.173.096-.39.323-.355.66.104 1.424.207 1.921.207s1.26-.103 1.92-.207c.228-.036.38.182.324.355l-.659 1.975A9.7 9.7 0 0 0 12 5.25a9.7 9.7 0 0 0-1.585.123zm9.214 15.697a1.5 1.5 0 0 1-.183.155H5.213a1.5 1.5 0 0 1-.183-.155c-.168-.169-.28-.364-.28-.595 0-.102.086-.281.416-.501a2.8 2.8 0 0 1 .537-.275l.01-.004.021-.008h.004l.002-.001A.75.75 0 0 0 6.25 17c0-2.61.01-5.205.762-7.156.367-.95.895-1.706 1.656-2.23S10.489 6.75 12 6.75s2.571.34 3.332.864 1.29 1.28 1.656 2.23c.752 1.951.762 4.545.762 7.156a.75.75 0 0 0 .51.71l.002.001.004.002.032.011a3 3 0 0 1 .536.275c.33.22.416.4.416.501 0 .23-.112.426-.28.595"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSack;
