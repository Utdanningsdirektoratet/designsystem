'use client';
import React, { type Ref, type SVGProps, forwardRef } from 'react';
import { useId } from './util/useId';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
interface SVGRProps {
  size?: number | string;
}
const SvgHighfiveOutline = forwardRef(
  (
    {
      size,
      title,
      titleId: _titleId,
      ...props
    }: SVGProps<SVGSVGElement> & SVGRProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    let titleId: string | undefined = useId();
    titleId = title ? (_titleId ? _titleId : 'title-' + titleId) : undefined;
    const __srcW = 41;
    const __srcH = 42;
    const __isWide = false;
    const __sizeProps = (() => {
      if (props?.width != null || props?.height != null) return {};
      const v = size ?? (__isWide ? __srcW : __srcH); // set size based on original aspect ratio
      return __isWide
        ? {
            style: {
              width: v,
              height: 'auto',
            },
          }
        : {
            style: {
              height: v,
              width: 'auto',
            },
          };
    })();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 41 42"
        {...__sizeProps}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="m20.528 20.643-.252-.895s-.574-6.08-.941-7.756c-.39-1.675-1.721-1.767-1.905-.78-.16.986-.252 3.396-.298 4.475-.07 1.468.298 4.956.298 4.956l-.665.092s-.78-4.681-.872-5.53c-.138-1.194-.459-3.075-.758-4.957-.343-2.134-2.203-1.56-2.272-.207-.045.826.788 8.744.765 10.189 0 1.882-.443.574-.443.574s-.826-3.489-.964-4.2c-.252-1.308-.574-3.144-.872-4.52-.344-1.492-1.974-.941-1.905.367.023.895.23 3.58.322 4.589.068.758.963 6.495.963 6.495l-.32.253s-2.227-4.843-2.87-5.67c-.642-.825-1.399-.16-1.17.667.23.802 2.433 6.792 2.433 6.792s1.308 6.506 1.469 7.47c.183.964 2.857 3.504 2.857 3.504l1.502 3.005c1.083.09 2.576-.496 4.005-1.305"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.2}
          d="M15.182 33.83s-.942-1.354-.804-2.777 1.033-4.154 2.18-5.323a3.7 3.7 0 0 1 .575-.47M17.11 22.264c-.896 1.125-1.86 2.479-2.685 2.914-1.47.827-4.246 2.547-4.246 2.547"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="M19.136 32.045c-.443-1.497-1.427-4.216-1.767-5.5a4.5 4.5 0 0 1-.15-1.388c.07-1.214.228-3.182.252-3.594a.4.4 0 0 1 .032-.159l.091-.386a2.3 2.3 0 0 0 .04-.687c-.044-.44-.135-1.25-.147-1.847-.017-.898.947-.889 1.8.287.405.552.702 5.657.85 6.264l.501-3.472s.755-7.452 1.217-9.104c.486-1.65 1.82-1.665 1.947-.669.104.994.057 3.405.04 4.485-.015 1.47-.339 5.477-.339 5.477l.688.04s.798-5.061.96-5.902c.207-1.183.635-3.044 1.042-4.906.466-2.11 2.288-1.431 2.28-.075-.002.827-1.265 8.664-1.325 10.11-.108 1.877.615 1 .615 1s.796-3.819.975-4.521c.326-1.291.753-3.106 1.13-4.464.429-1.469 2.024-.826 1.88.476-.074.892-.435 3.561-.584 4.564-.112.752-1.106 6.813-1.106 6.813l.306.27s2.272-5.09 2.96-5.88c.69-.787 1.407-.079 1.131.733-.276.789-2.818 6.642-2.818 6.642s-1.057 5.441-1.273 6.394c-.238.952-2.109 2.003-2.109 2.003L26.647 41c-2.785.07-8.365-2.404-8.512-3.446.366-.784 1.001-5.508 1.001-5.508M2.675 20.689 1 20.046M5.806 10.75 2.112 7.008M18.463 6.99 17.43 1M29.55 6.438l1.424-4.727M35.811 15.517l3.465-2.845M36.348 23.993l1.216-.412"
        />
      </svg>
    );
  },
);
export default SvgHighfiveOutline;
