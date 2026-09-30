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
const SvgTeddyBear = forwardRef<
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
          d="M6.294 2.475a2.75 2.75 0 0 1 3.44-.113l.35.264a4.75 4.75 0 0 1 3.832 0l.246-.185a2.75 2.75 0 0 1 3.595.255l.143.143a2.75 2.75 0 0 1-.15 4.028v.397a6 6 0 0 1-1.04 3.373l.194-.108a2.207 2.207 0 1 1 2.143 3.858l-.677.376a2.871 2.871 0 0 1 1.16 4.767l-1 1a2.87 2.87 0 0 1-4.303-.275A5.2 5.2 0 0 1 12 20.75c-.795 0-1.55-.177-2.227-.495a2.871 2.871 0 0 1-4.303.275l-1-1a2.87 2.87 0 0 1 1.16-4.767l-.678-.376a2.207 2.207 0 0 1 2.144-3.858l.195.108A6 6 0 0 1 6.25 7.264v-.357a2.75 2.75 0 0 1-.131-4.282zM15.53 17.53l1-1a1.371 1.371 0 0 1 1.939 1.94l-1 1a1.371 1.371 0 0 1-1.94-1.94m.19-2.505q.012.101.02.206a3 3 0 0 0-.239.207l-.015.015-.017.017-1 1q-.21.21-.367.448a2.87 2.87 0 0 0-.45 1.95A3.7 3.7 0 0 1 12 19.25a3.7 3.7 0 0 1-1.652-.382 2.87 2.87 0 0 0-.817-2.398l-1-1a3 3 0 0 0-.271-.24q.006-.103.02-.205a.75.75 0 0 0-.517-.809.7.7 0 0 1-.13-.056L5.68 13.076a.707.707 0 0 1 .686-1.236l1.952 1.084q.03.016.056.035a.75.75 0 0 0 .956-.093q.277-.28.605-.498a.75.75 0 0 0-.024-1.267A4.49 4.49 0 0 1 7.75 7.264V6.5a.75.75 0 0 0-.364-.643l-.12-.073a1.25 1.25 0 0 1-.171-2.02l.175-.15a1.25 1.25 0 0 1 1.563-.051l.717.537a.75.75 0 0 0 .785.07l.211-.105a3.25 3.25 0 0 1 2.907 0l.212.106a.75.75 0 0 0 .785-.071l.612-.46a1.25 1.25 0 0 1 1.634.117l.143.143a1.25 1.25 0 0 1-.134 1.884l-.155.116a.75.75 0 0 0-.3.6v.764c0 1.577-.827 3.029-2.162 3.837a.75.75 0 0 0-.025 1.267q.33.218.606.498a.75.75 0 0 0 .956.093l.056-.035 1.951-1.084a.707.707 0 0 1 .687 1.236l-1.952 1.084a.7.7 0 0 1-.13.056.75.75 0 0 0-.517.809M5.53 16.53a1.37 1.37 0 0 1 1.939 0l1 1q.105.105.181.224a1.372 1.372 0 0 1-2.12 1.716l-1-1a1.37 1.37 0 0 1 0-1.94M10.5 6.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5zm.47 2.22A.75.75 0 0 1 12 8.94a.75.75 0 0 1 1.03 1.09l-.5.5a.75.75 0 0 1-1.06 0l-.5-.5a.75.75 0 0 1 0-1.061m1.78-1.47a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5h-.01a.75.75 0 0 1-.75-.75"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgTeddyBear;
