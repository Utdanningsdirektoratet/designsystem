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
const SvgPortalFill = forwardRef<
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
          d="M6.116 4.09C6.631 3.591 7.27 3.25 8 3.25s1.369.342 1.884.84c.51.493.937 1.172 1.278 1.953.684 1.563 1.088 3.67 1.088 5.957s-.404 4.394-1.088 5.958c-.341.78-.767 1.459-1.278 1.953-.515.497-1.153.839-1.884.839s-1.369-.342-1.884-.84c-.51-.494-.937-1.172-1.278-1.953C4.154 16.395 3.75 14.288 3.75 12s.404-4.394 1.088-5.957c.341-.78.767-1.46 1.278-1.954m5.017 16.494c-.178-.07-.181-.31-.031-.427q.146-.116.282-.247c.51-.494.937-1.172 1.278-1.953.684-1.563 1.088-3.67 1.088-5.957s-.404-4.394-1.088-5.957c-.341-.78-.767-1.46-1.278-1.954a4 4 0 0 0-.282-.246c-.15-.118-.147-.357.031-.427.271-.106.56-.166.867-.166.731 0 1.37.342 1.884.84.51.493.937 1.172 1.278 1.953.684 1.563 1.088 3.67 1.088 5.957s-.404 4.394-1.088 5.958c-.341.78-.767 1.459-1.278 1.953-.515.497-1.153.839-1.884.839-.306 0-.596-.06-.867-.166m3.969-.427c-.15.118-.147.357.031.427.271.106.56.166.867.166.731 0 1.37-.342 1.884-.84.51-.494.937-1.172 1.278-1.953.684-1.563 1.088-3.67 1.088-5.957s-.404-4.394-1.088-5.957c-.341-.78-.767-1.46-1.278-1.954-.515-.497-1.153-.839-1.884-.839-.306 0-.596.06-.867.166-.178.07-.181.31-.031.427q.146.116.282.246c.51.494.937 1.173 1.278 1.954.684 1.563 1.088 3.67 1.088 5.957s-.404 4.394-1.088 5.958c-.341.78-.767 1.459-1.278 1.953q-.135.131-.282.246"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgPortalFill;
