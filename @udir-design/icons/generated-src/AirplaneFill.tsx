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
const SvgAirplaneFill = forwardRef<
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
          d="M6.388 3.625a.75.75 0 0 0-.412 1.145L8.368 8.26l-.255.073-2.318-1.643a.75.75 0 0 0-.64-.11l-1.923.552a.75.75 0 0 0-.33 1.245l3.07 3.146a5.75 5.75 0 0 0 5.7 1.51l8.665-2.483c.99-.284 1.231-1.577.41-2.199l-1.595-1.207a4.75 4.75 0 0 0-4.176-.779l-1.547.444-4.44-3.596a.75.75 0 0 0-.678-.138zm3.672 11.61c-.16.095-.155.326-.002.432q.481.336.874.776c.911 1.025 1.318 2.328 1.318 3.557v.014c-.001.16.13.3.29.289.462-.033.915-.053 1.323-.053 1.747 0 4.326.376 4.981.476.105.016.21.03.314.007A.75.75 0 0 0 19.75 20c0-2.914-2.336-5.75-6.25-5.75-1.363 0-2.532.45-3.44.986M4.19 17.44c.649-.73 1.606-1.189 2.81-1.189s2.161.459 2.81 1.19c.638.716.94 1.65.94 2.56a.75.75 0 0 1-.478.7c-.172.066-.361.024-.54-.021-.54-.138-1.79-.429-2.732-.429s-2.192.29-2.732.429c-.179.046-.368.087-.54.02A.75.75 0 0 1 3.25 20c0-.91.302-1.844.94-2.56"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgAirplaneFill;
