const PATCHED = Symbol.for('@udir-design/react/patchSuggestionEmptyMatch');

let requested = false;

/**
 * Keeps `<ds-suggestion>` from selecting `Suggestion.Empty` on Enter.
 *
 * `<ds-suggestion>` sets the `label` of `Suggestion.Empty` to the typed text so
 * that `<u-datalist>` does not filter it out, and its `value` to an empty
 * string unless `creatable`. On Enter, and while typing in single mode,
 * u-combobox picks the first option whose label equals the typed text. That is
 * `Suggestion.Empty`, which comes before the other options, so the typed text
 * was selected with an empty value, even when an option had that exact label.
 * In `multiple` mode, pressing Enter again removed it.
 *
 * While u-combobox handles the events where it matches, this empties the label
 * of `Suggestion.Empty` so it never matches. With `creatable`, u-combobox then
 * creates the typed text itself when no other option matches.
 *
 * Remove this once a published `@u-elements/u-combobox` or
 * `@digdir/designsystemet-web` fixes it.
 */
export function patchSuggestionEmptyMatch() {
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

    const handling = new WeakSet<HTMLElement>();
    proto[PATCHED] = true;
    proto.handleEvent = function (this: HTMLElement, event: Event) {
      /* u-combobox matches on Enter and while typing, and dispatches nested
         `input` events while it handles one. Limited to these, as
         `<ds-suggestion>` after 1.23.0 observes every label change */
      const matches =
        event.type === 'input' ||
        (event.type === 'keydown' && (event as KeyboardEvent).key === 'Enter');
      if (!matches || handling.has(this)) return handleEvent.call(this, event);

      const labels = Array.from(
        this.querySelectorAll('[data-empty]'),
        (option) => [option, option.getAttribute('label')] as const,
      );
      for (const [option] of labels) option.setAttribute('label', '');
      handling.add(this);
      try {
        return handleEvent.call(this, event);
      } finally {
        handling.delete(this);
        for (const [option, label] of labels) {
          /* `<ds-suggestion>` updates the label itself after a selection */
          if (option.getAttribute('label') !== '') continue;
          if (label === null) option.removeAttribute('label');
          else option.setAttribute('label', label);
        }
      }
    };
  });
}
