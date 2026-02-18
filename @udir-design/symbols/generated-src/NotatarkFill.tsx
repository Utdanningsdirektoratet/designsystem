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
const SvgNotatarkFill = forwardRef(
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
          fill="#FBFBFB"
          stroke="#303030"
          strokeWidth={0.4}
          d="M37.27 30.53C36.579 28.637 29.416 5.625 29 4.146c-.385-1.37-.492-2.064-.506-2.16q0-.002-.002-.004l-.003-.003-.004-.001h-.005l-3.431.868h-.007q-.004-.002-.004-.004l-.002-.003-.494-1.827q0-.002-.002-.004-.001 0-.002-.003h-.009L1.008 6.45l-.003.002-.003.004Q1 6.456 1 6.46v.003l10.162 33.113v.004l.004.003q.003 0 .004.002.003 0 .004-.002l3.524-.958h.009l.005.007.841 2.36q.001.005.007.007.003.002.007 0l23.813-7.091q.002 0 .004-.002l.003-.005v-.006q0-.003-.003-.004c-.138-.145-1.457-1.567-2.113-3.36Z"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="M25.038 2.848 5.248 8.025S10.468 26 11.116 28.127c.646 2.128 3.593 10.496 3.593 10.496"
        />
        <path
          stroke="#303030"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.4}
          d="M10.436 14.618s1.304-2.929 2.34-3.05 1.448 2.174 1.94 2.043c.492-.132.59-1.744 1.872-1.694s1.531.663 1.531.663 1.088-.962 1.58-1.093c.492-.13.72.647.72.647s1.283-1.372 2.476-.727 2.793-.472 4.975-1.039M12.069 19.177s1.723-.666 2.408-2.124c.683-1.459-1.738-1.809-1.54-.122s2.197 1.674 3.601.622c1.405-1.052 1.427-1.184 3.104-.838 1.678.347 1.562-.723 3.036-1.087 1.475-.363 1.601.64 2.431.286.52-.219 2.443-1.069 4.269-1.296M13.311 23.903s.455-2.438 1.678-2.568 1.63 1.078 2.471.805c.841-.274 1.21-1.603 2.46-1.183s1.544.14 2.388-.306c.843-.445 2.117-.157 2.117-.157"
        />
        <path
          fill="#7F99AE"
          stroke="#303030"
          strokeWidth={0.4}
          d="M25.41 2.71s-.077-1.286-.059-1.397A.43.43 0 0 1 25.75 1c.25-.015.394.127.416.226l.314 1.48z"
        />
        <path
          fill="#76C69D"
          stroke="#303030"
          strokeWidth={0.4}
          d="M27.282 18.57 25.234 2.685s.189-.277.667-.338c.16-.026.326-.012.48.04a.6.6 0 0 1 .206.124l2.059 15.92z"
        />
        <path
          fill="#BED5E8"
          stroke="#303030"
          strokeWidth={0.4}
          d="M28.05 19.19c.524-.065.705.204.722.232v.004l-.087 1.949a.1.1 0 0 1-.01.036.1.1 0 0 1-.022.03.39.39 0 0 1-.467.06.1.1 0 0 1-.026-.026c-.256-.47-.745-1.92-.745-1.92s.109-.297.635-.365Z"
        />
        <path
          fill="#303030"
          stroke="#303030"
          strokeWidth={0.4}
          d="M28.3 21.518v-.005q0-.003.003-.004a.3.3 0 0 1 .133-.053.3.3 0 0 1 .146.015l.002.005c-.006.246-.018.434-.02.47l-.003.004-.004.003-.076.024h-.006l-.005-.005zM28.216 14.496c.138 1.008.561 4.045.656 4.718a.2.2 0 0 1-.02.116.2.2 0 0 1-.079.084s-.594-.401-1.364.144l-.048-.029a.2.2 0 0 1-.065-.061.2.2 0 0 1-.03-.084l-.622-4.653a.3.3 0 0 1 .032-.177.3.3 0 0 1 .126-.129c.244-.13.7-.309 1.194-.18a.3.3 0 0 1 .22.25Z"
        />
      </svg>
    );
  },
);
export default SvgNotatarkFill;
