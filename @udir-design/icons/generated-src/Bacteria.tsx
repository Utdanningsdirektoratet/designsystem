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
const SvgBacteria = forwardRef<
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
          d="M12.773 2.69a.75.75 0 1 0-1.366.62l.153.337a5 5 0 0 0-1.512 1.364l-.73-.389a.75.75 0 0 0-.706 1.324l.711.379q-.271.67-.421 1.48-.106.575-.145 1.22l-.02.286-1-.17a.75.75 0 0 0-.25 1.48l1.002.17c-.115.435-.26.822-.426 1.172-.345.728-.798 1.323-1.32 1.893-.318.347-.645.669-.992 1.009l-.049.048-.76-.47a.75.75 0 1 0-.79 1.275l.534.33c-.28.416-.483.879-.552 1.365-.1.717.101 1.405.619 1.971l-.822 1.19a.75.75 0 0 0 1.234.853l.822-1.19q.522.234 1.182.392c.709.17 1.555.281 2.552.322q.429.018.897.018.897-.001 1.682-.175l.212.499a.75.75 0 0 0 1.38-.586l-.167-.395a6.5 6.5 0 0 0 1.972-1.443 8.2 8.2 0 0 0 1.217-1.698l1.16.443a.75.75 0 1 0 .534-1.402l-1.07-.408q.232-.621.4-1.246a17 17 0 0 0 .36-1.696l1.037.164a.75.75 0 0 0 .235-1.482l-1.091-.172c.053-.64.07-1.213.07-1.671 0-.727-.01-1.44-.074-2.107-.067-.714-.198-1.414-.463-2.049l.734-.472a.75.75 0 0 0-.811-1.261l-.741.476c-.519-.532-1.208-.917-2.093-1.143a4.7 4.7 0 0 0-2.138-.036zm-.264 16.495a5 5 0 0 0 2.096-1.344c.513-.544.926-1.199 1.257-1.917l.008-.018c.255-.555.458-1.144.62-1.739.206-.765.34-1.533.426-2.246l.002-.015c.102-.86.132-1.632.132-2.205 0-.72-.012-1.374-.068-1.966-.083-.873-.257-1.539-.573-2.034l-.008-.011-.006-.01c-.311-.477-.802-.861-1.666-1.082a3.27 3.27 0 0 0-1.932.117c-.68.256-1.344.764-1.826 1.631l-.003.006-.013.023a5.7 5.7 0 0 0-.578 1.702q-.089.476-.122 1.037-.039.63-.13 1.19a8.6 8.6 0 0 1-.707 2.303c-.43.906-.985 1.625-1.568 2.262-.347.378-.72.745-1.08 1.098l-.442.437c-.426.43-.659.866-.708 1.219-.046.323.042.67.55 1.01.292.196.726.388 1.35.538.591.142 1.337.243 2.263.281q.396.017.835.017c.713 0 1.336-.103 1.88-.28zm1.224-12.16a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0m-.2 7.704a.552.552 0 1 0 0 1.103.552.552 0 0 0 0-1.103m-2.052.551a2.052 2.052 0 1 1 4.104 0 2.052 2.052 0 0 1-4.104 0"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgBacteria;
