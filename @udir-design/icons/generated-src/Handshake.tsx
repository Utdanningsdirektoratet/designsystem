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
const SvgHandshake = forwardRef<
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
          d="M13.737 3.177a1.75 1.75 0 0 0-2.474 0L9.689 4.75H3a.75.75 0 0 0-.75.75v9c0 .199.079.39.22.53l5.5 5.5c.613.614 1.319.931 2.021.954a2.41 2.41 0 0 0 2.35-1.583l.129.13c.613.613 1.319.93 2.021.953a2.41 2.41 0 0 0 2.361-1.618c.517.394 1.079.6 1.64.618a2.41 2.41 0 0 0 2.492-2.493c-.023-.702-.34-1.408-.954-2.021l-.22-.22H21a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-5.69zM12.53 7.97l5.78 5.78h1.94v-7.5H15a.75.75 0 0 1-.53-.22l-1.793-1.793a.25.25 0 0 0-.354 0L7.561 9l.555.555a1.25 1.25 0 0 0 1.768 0L11.47 7.97a.75.75 0 0 1 1.06 0m-1.545 11.07c-.009-.266-.129-.623-.515-1.01l-1.5-1.5a.75.75 0 1 1 1.06-1.06l3.5 3.5c.387.386.744.506 1.01.515a.91.91 0 0 0 .945-.945c-.009-.266-.129-.623-.515-1.01l-3.5-3.5a.75.75 0 1 1 1.06-1.06l5 5c.387.386.744.506 1.01.515a.91.91 0 0 0 .945-.945c-.009-.266-.129-.623-.515-1.01L12 9.56l-1.056 1.056a2.75 2.75 0 0 1-3.889 0L5.97 9.53a.75.75 0 0 1 0-1.06l2.22-2.22H3.75v7.94l5.28 5.28c.387.386.744.506 1.01.515a.91.91 0 0 0 .945-.945"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgHandshake;
