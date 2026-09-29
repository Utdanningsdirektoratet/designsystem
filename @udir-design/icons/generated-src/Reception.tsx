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
const SvgReception = forwardRef<
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
          d="M16.5 5.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M13.75 7a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M9 6.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M6.25 8a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0m7.772 3.491A3 3 0 0 1 16.5 10.25a3 3 0 0 1 2.478 1.241c.53.716.772 1.632.772 2.509v1.25H21a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-2.25h-8V19a.75.75 0 0 1-1.5 0v-4c0-.623-.175-1.207-.478-1.616-.286-.387-.695-.634-1.272-.634s-.986.247-1.272.634c-.303.409-.478.993-.478 1.616v4a.75.75 0 0 1-1.5 0v-2.25h-2V19a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75h2.75V15c0-.877.242-1.793.772-2.509A3 3 0 0 1 9 11.25a3 3 0 0 1 2.478 1.241c.53.716.772 1.632.772 2.509v.25h1V14c0-.877.242-1.793.772-2.509M14.75 14c0-.623.175-1.207.478-1.616.286-.387.695-.634 1.272-.634s.986.247 1.272.634c.303.409.478.993.478 1.616v1.25h-3.5z"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgReception;
