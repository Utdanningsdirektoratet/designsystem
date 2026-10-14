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
const SvgCloud = forwardRef<
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
          d="M11.055 7.25c-2.272 0-4.205 1.859-4.39 4.476l-.748-.053.749.051c-.023.323-.099.688-.352.996-.254.31-.597.454-.914.534-.595.159-1.003.414-1.259.706-.249.286-.391.648-.391 1.106 0 .54.19.933.497 1.2.318.278.839.484 1.6.484H17.3c1.68 0 2.951-1.273 2.951-2.879 0-.784-.301-1.485-.862-1.995-.562-.511-1.436-.875-2.646-.875-.325 0-.674-.043-.995-.23-.33-.192-.53-.478-.672-.766v-.002c-.874-1.796-2.258-2.753-4.02-2.753M5.17 11.62c.233-3.297 2.725-5.87 5.886-5.87 2.435 0 4.29 1.38 5.368 3.597.042.085.07.118.08.129a.7.7 0 0 0 .239.025c1.515 0 2.77.46 3.656 1.266.887.807 1.352 1.917 1.352 3.104 0 2.46-1.968 4.379-4.451 4.379H5.848c-1.024 0-1.927-.278-2.586-.852-.67-.582-1.012-1.406-1.012-2.332 0-.798.259-1.517.762-2.093.497-.568 1.194-.954 2.007-1.17l.01-.003a1 1 0 0 0 .12-.038 1 1 0 0 0 .02-.14zM16.5 9.474h.001m.003.002.004.003z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgCloud;
