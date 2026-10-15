// jsdom lacks `CSS.escape`, which the Digdir popover polyfill calls at import time.
if (typeof globalThis.CSS === 'undefined') {
  Object.defineProperty(globalThis, 'CSS', {
    value: { escape: (value: string) => value.replace(/[^\w-]/g, '\\$&') },
  });
}

// jsdom does not implement modal dialogs; model only the `open` state.
if (typeof HTMLDialogElement !== 'undefined') {
  const proto = HTMLDialogElement.prototype;
  if (!('showModal' in proto)) {
    Object.assign(proto, {
      showModal(this: HTMLDialogElement) {
        this.setAttribute('open', '');
      },
      close(this: HTMLDialogElement) {
        this.removeAttribute('open');
      },
    });
  }
}
