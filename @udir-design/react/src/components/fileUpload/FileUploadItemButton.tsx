import { Tooltip } from '@digdir/designsystemet-react';
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Button, type ButtonProps } from '../button';

export interface FileUploadItemButtonProps extends Omit<
  ButtonProps,
  | 'children'
  | 'icon'
  | 'variant'
  | 'asChild'
  | 'onClick'
  | 'aria-label'
  | 'aria-labelledby'
> {
  /**
   * Name of the file the button acts on. Shown and read out after the button
   * text, so every button in the list has a name of its own.
   */
  fileName: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * An icon button in a `FileUpload.Item`. The text is set in CSS through
 * `--ds-tooltip` on the class given in `className`.
 */
export const FileUploadItemButton = forwardRef<
  HTMLButtonElement,
  FileUploadItemButtonProps & { icon: ReactNode }
>(function FileUploadItemButton({ fileName, icon, ...rest }, ref) {
  const node = useRef<HTMLButtonElement | null>(null);
  const setRef = useCallback(
    (el: HTMLButtonElement | null) => {
      node.current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    },
    [ref],
  );

  /* Read from the button, so it follows the `lang` the button is in. */
  const [label, setLabel] = useState<string>();
  useLayoutEffect(() => {
    if (node.current) setLabel(cssText(node.current, '--ds-tooltip'));
  }, []);

  /* The tooltip shows the file name too, since its text is also the
     button's name: Digdir's tooltip sets it as `aria-label`, overwriting
     any we set ourselves, and the file name tells the buttons in a list
     apart. A name from `aria-labelledby` instead, pointing at the tooltip's
     `aria-label` and the file name on a hidden element, would have kept the
     tooltip short, but TalkBack 16, which Samsung phones come with, read such
     a button as "Knapp" with no name at all, in Chrome 150 and later;
     `aria-label` it reads. */
  return (
    <Tooltip content={label ? `${label} ${fileName}` : ''}>
      <Button ref={setRef} icon variant="tertiary" {...rest}>
        {icon}
      </Button>
    </Tooltip>
  );
});

/** A text from CSS, such as one that follows `lang`, without its quotes. */
function cssText(element: Element, property: string) {
  return getComputedStyle(element)
    .getPropertyValue(property)
    .trim()
    .replace(/^["']|["']$/g, '');
}
