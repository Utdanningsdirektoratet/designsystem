/**
 * Scrolls the label of the given form field into view, respecting css `scroll-behavior`, then focuses the form control
 * @param fieldId The id of the form control or a wrapper element like ds-field or fieldset
 */
export function focusFormField(fieldId: string): void;
/**
 * Scrolls the label of the given form field into view, respecting css `scroll-behavior`, then focuses the form control
 * @param field The form control or a wrapper element like ds-field or fieldset
 */
export function focusFormField(field: HTMLElement): void;
export function focusFormField(fieldIdOrElement: string | HTMLElement) {
  const el =
    typeof fieldIdOrElement === 'string'
      ? document.getElementById(fieldIdOrElement)
      : fieldIdOrElement;
  const field = el?.closest('ds-field') ?? el;
  const control = el?.matches('input, select, textarea')
    ? el
    : (el?.querySelector<HTMLElement>('input, select, textarea') ?? el);
  field?.scrollIntoView();
  control?.focus({ preventScroll: true });
}
