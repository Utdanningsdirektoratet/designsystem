const PROGRAMMATIC = 'comboboxprogrammaticinput';
const PATCHED = Symbol.for('@udir-design/react/patchSuggestionSelection');

let requested = false;

/**
 * Makes `<ds-suggestion>` with `creatable` select the option that was clicked.
 *
 * When an option is clicked, u-combobox restores the typed query by setting the
 * input value inside its `input` handler, before it selects the option. Since
 * `@digdir/designsystemet-web` 1.22.0, `<ds-suggestion>` handles the resulting
 * `comboboxprogrammaticinput` by copying the query to the create option
 * (`Suggestion.Empty`). That option comes first in the list and still had the
 * clicked option's value, so u-combobox has already picked it as the match and
 * selects it with the query, or an empty string, as label and value.
 *
 * While u-combobox handles an `input` event, this stops the event it fires
 * itself before it reaches `<ds-suggestion>`'s listener. Both listen in the
 * capture phase on the element, and u-combobox registers first.
 *
 * Digdir patches u-combobox in their own repository instead, which does not
 * reach consumers of the published packages:
 * https://github.com/digdir/designsystemet/blob/main/patches/%40u-elements__u-combobox.patch
 * Remove this once a published `@u-elements/u-combobox` or
 * `@digdir/designsystemet-web` fixes it.
 */
export function patchSuggestionSelection() {
  if (requested || typeof window === 'undefined' || !window.customElements)
    return;
  requested = true;

  void window.customElements.whenDefined('ds-suggestion').then(() => {
    const element = window.customElements.get('ds-suggestion');
    const proto = element?.prototype as
      | { handleEvent?: (event: Event) => void; [PATCHED]?: true }
      | undefined;
    const handleEvent = proto?.handleEvent;
    /* Another copy of this package may already have patched it */
    if (!proto || proto[PATCHED] || typeof handleEvent !== 'function') return;

    const handlingInput = new WeakSet<HTMLElement>();
    proto[PATCHED] = true;
    proto.handleEvent = function (this: HTMLElement, event: Event) {
      if (event.type === 'input') {
        handlingInput.add(this);
        try {
          return handleEvent.call(this, event);
        } finally {
          handlingInput.delete(this);
        }
      }
      handleEvent.call(this, event);
      if (event.type === PROGRAMMATIC && handlingInput.has(this))
        event.stopImmediatePropagation();
    };
  });
}
