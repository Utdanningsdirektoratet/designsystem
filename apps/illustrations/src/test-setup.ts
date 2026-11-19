// jsdom lacks `CSS.escape`, which the Digdir popover polyfill calls at import time.
if (typeof globalThis.CSS === 'undefined') {
  Object.defineProperty(globalThis, 'CSS', {
    value: { escape: (value: string) => value.replace(/[^\w-]/g, '\\$&') },
  });
}

// jsdom does not implement modal dialogs; model the `open` state and the `close` event.
if (typeof HTMLDialogElement !== 'undefined') {
  const proto = HTMLDialogElement.prototype;
  if (!('showModal' in proto)) {
    Object.assign(proto, {
      showModal(this: HTMLDialogElement) {
        this.setAttribute('open', '');
      },
      close(this: HTMLDialogElement) {
        if (!this.hasAttribute('open')) return;
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close'));
      },
    });
  }
}

// jsdom lacks IntersectionObserver. This stand-in never reports, so lazy images that the source
// downloads stay unloaded unless a test reports them itself.
if (typeof globalThis.IntersectionObserver === 'undefined') {
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  });
}
