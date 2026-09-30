import {
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
const SvgMotorcycleFill = forwardRef<
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
          d="M13.5 5.25a.75.75 0 0 0-.696 1.029l.59 1.473a2.25 2.25 0 0 0-2.016 1.498h-1.58a5.87 5.87 0 0 0-3.92-1.5H4a.75.75 0 0 0-.67 1.085l1.5 3a.75.75 0 0 0 .67.415H6a3.75 3.75 0 0 1 3.675 3H6a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 .75-.75c0-1.339.702-2.514 1.757-3.177l1.29 3.44a.75.75 0 1 0 1.405-.526l-1.29-3.441q.287-.045.588-.046h1a.75.75 0 0 0 .75-.75V11A5.75 5.75 0 0 0 14 5.25zm2.217 9.216c.105-.155.33-.113.396.061l.717 1.912a1.25 1.25 0 0 0 2.34-.878l-.717-1.912c-.065-.175.077-.354.258-.306a2.751 2.751 0 1 1-2.993 1.123M8.043 17.25c.186 0 .305.197.196.349a2.75 2.75 0 1 1 0-3.197c.109.151-.01.348-.196.348H6a1.25 1.25 0 1 0 0 2.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgMotorcycleFill;
