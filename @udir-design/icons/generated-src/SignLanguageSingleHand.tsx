import React, {
  forwardRef,
  useId,
  type Ref,
  type SVGAttributes,
  type SVGProps,
} from 'react';
interface SVGRProps {
  /**
   * @deprecated Use `aria-label` for an accessible name, and the `Tooltip` component from `@udir-design/react` for a tooltip. Will be removed in the next major version.
   */
  title?: string;
  /**
   * @deprecated Only used by the deprecated `title` prop. Will be removed in the next major version.
   */
  titleId?: string;
}
const SvgSignLanguageSingleHand = forwardRef<
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
          d="m5.663 8.25 3.114-3.503a2.08 2.08 0 0 1 3.313.272l.741-.833a2.14 2.14 0 0 1 2.443-.544 2.13 2.13 0 0 1 1.295 1.942l.667-.4a2.119 2.119 0 0 1 2.305 3.553l-2.515 1.76.116.015q.14.018.275.046A3.43 3.43 0 0 1 20.09 13.3l.377 2.076q.021.116.03.23a2.242 2.242 0 0 1-4.455.488l-.201-1.406-3.316-.332a.25.25 0 0 0-.275.249v.99l.001.024a.26.26 0 0 0 .232.236l2.192.243q.22.026.428.089a2.334 2.334 0 0 1-.686 4.563h-2.194c-.263 0-.523-.061-.758-.179L7.823 18.75H3.5a.75.75 0 0 1-.75-.75V9a.8.8 0 0 1 .024-.187.75.75 0 0 1 .726-.563zm8.29-3.067a.638.638 0 1 1 .928.875L13.47 7.47a.75.75 0 0 0 .034 1.093.75.75 0 0 0 .882.08l3.622-2.173a.619.619 0 0 1 .673 1.038l-4.111 2.878a.749.749 0 0 0 .337 1.358l2.049.256a1.93 1.93 0 0 1 1.658 1.569l.377 2.075q.007.039.01.076a.742.742 0 0 1-1.475.162l-.24-1.682a1.144 1.144 0 0 0-1.019-.977l-3.593-.36a1.75 1.75 0 0 0-1.924 1.742v.99q0 .084.008.166a1.76 1.76 0 0 0 1.56 1.584l2.19.244a.833.833 0 0 1 .741.828l.001.005a.833.833 0 0 1-.833.828h-2.194a.2.2 0 0 1-.087-.02l-3.8-1.9A.75.75 0 0 0 8 17.25H6.75V9.285l3.148-3.541a.579.579 0 1 1 .865.769L9.44 8.002a.75.75 0 0 0 1.121.997zM4.25 17.25v-7.5h1v7.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgSignLanguageSingleHand;
