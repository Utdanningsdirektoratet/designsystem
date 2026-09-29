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
const SvgRecycle = forwardRef<
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
          d="M14.344 4.002a.25.25 0 0 1 .215.121l1.253 2.087a.75.75 0 0 0 1.03.256l.297-.179-.496 2.761-2.67-.858.297-.179a.75.75 0 0 0 .257-1.029l-1.79-2.979zm-4.715.003h1.358l1.868 3.107-1.072.644a.75.75 0 0 0 .157 1.357L17 10.739a.75.75 0 0 0 .968-.582l.94-5.231a.75.75 0 0 0-1.125-.776l-1.071.644-.867-1.443a1.75 1.75 0 0 0-1.501-.849l-4.716.003a1.75 1.75 0 0 0-1.476.812L7.247 4.74a.75.75 0 1 0 1.266.804l.905-1.424a.25.25 0 0 1 .21-.116M7.894 7.944a.75.75 0 0 1 .387.484l1.302 5.153a.75.75 0 0 1-1.067.852l-1.114-.567-1.646 3.23.72 1.152a.25.25 0 0 0 .21.117l1.688.013a.75.75 0 1 1-.011 1.5l-1.688-.013a1.75 1.75 0 0 1-1.47-.821l-2.501-3.998a1.75 1.75 0 0 1-.076-1.723l.764-1.5-1.113-.568a.75.75 0 0 1 .061-1.364l4.935-1.975a.75.75 0 0 1 .62.028m-3.066 7.67 1.578-3.097a.75.75 0 0 1 1.009-.328l.309.157-.687-2.72-2.605 1.043.31.158a.75.75 0 0 1 .327 1.009l-1.105 2.168a.25.25 0 0 0 .011.246zm14.837-4.285a.75.75 0 0 1 1.006.336l.754 1.509a1.75 1.75 0 0 1-.064 1.683L18.934 18.9a1.75 1.75 0 0 1-1.5.85H15.75V21a.75.75 0 0 1-1.244.564l-4-3.5a.75.75 0 0 1 0-1.128l4-3.5A.75.75 0 0 1 15.75 14v1.25h3.625l.7-1.165a.25.25 0 0 0 .009-.24l-.755-1.51a.75.75 0 0 1 .336-1.006m-1.19 5.421H15a.75.75 0 0 1-.75-.75v-.347L12.139 17.5l2.111 1.847V19a.75.75 0 0 1 .75-.75h2.434a.25.25 0 0 0 .214-.121z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgRecycle;
