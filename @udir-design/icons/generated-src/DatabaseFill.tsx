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
const SvgDatabaseFill = forwardRef<
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
          d="M20.75 8c0-.731-.342-1.369-.84-1.884-.494-.51-1.172-.937-1.953-1.278C16.395 4.154 14.288 3.75 12 3.75s-4.394.404-5.957 1.088c-.78.341-1.46.767-1.954 1.278C3.592 6.631 3.25 7.27 3.25 8s.342 1.369.84 1.884c.493.51 1.172.937 1.953 1.278 1.563.684 3.67 1.088 5.957 1.088s4.394-.404 5.958-1.088c.78-.341 1.459-.767 1.953-1.278.497-.515.839-1.153.839-1.884m-.593 3.102c.118-.15.357-.147.427.031.106.271.166.56.166.867 0 .731-.342 1.37-.84 1.884-.494.51-1.172.937-1.953 1.278-1.563.684-3.67 1.088-5.957 1.088s-4.394-.404-5.957-1.088c-.78-.341-1.46-.767-1.954-1.278-.497-.515-.839-1.153-.839-1.884 0-.306.06-.596.166-.867.07-.178.31-.181.427-.031q.116.146.246.282c.494.51 1.173.937 1.954 1.278 1.563.684 3.67 1.088 5.957 1.088s4.394-.404 5.958-1.088c.78-.341 1.459-.767 1.953-1.278q.131-.135.246-.282m0 4c.118-.15.357-.147.427.031.106.271.166.56.166.867 0 .731-.342 1.37-.84 1.884-.494.51-1.172.937-1.953 1.278-1.563.684-3.67 1.088-5.957 1.088s-4.394-.404-5.957-1.088c-.78-.341-1.46-.767-1.954-1.278-.497-.515-.839-1.153-.839-1.884 0-.306.06-.596.166-.867.07-.178.31-.181.427-.031q.116.146.246.282c.494.51 1.173.937 1.954 1.278 1.563.684 3.67 1.088 5.957 1.088s4.394-.404 5.958-1.088c.78-.341 1.459-.767 1.953-1.278q.131-.135.246-.282"
          clipRule="evenodd"
        />
      </svg>
    );
  },
);
export default SvgDatabaseFill;
