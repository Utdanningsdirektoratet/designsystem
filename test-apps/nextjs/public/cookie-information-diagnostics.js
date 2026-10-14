window.__cookieInformationDiagnosticsLoaded = true;
(() => {
  const events = [];
  const record = (type, details = {}) => {
    events.push({
      type,
      at: Math.round(performance.now()),
      readyState: document.readyState,
      ...details,
    });
    window.dispatchEvent(new Event('CookieInformationDiagnosticsEvent'));
  };

  window.__cookieInformationDiagnosticEvents = events;
  window.__recordCookieInformationDiagnosticEvent = record;

  const originalShowModal = HTMLDialogElement.prototype.showModal;
  HTMLDialogElement.prototype.showModal = function () {
    record('showModal', {
      dialogId: this.id,
      optionalCategories: this.querySelectorAll('.coi__checkbox').length,
    });
    return originalShowModal.call(this);
  };

  const observeDialog = () => {
    const dialog = document.getElementById('cookie-dialog');
    if (!dialog || dialog.dataset.diagnosticsObserved === 'true') return;

    dialog.dataset.diagnosticsObserved = 'true';
    record('template-ready', {
      optionalCategories: dialog.querySelectorAll('.coi__checkbox').length,
    });
    dialog.addEventListener('cancel', () => record('cancel'));
    dialog.addEventListener('close', () => record('close'));
  };

  new MutationObserver(observeDialog).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  window.addEventListener('CookieInformationConsentGiven', () =>
    record('CookieInformationConsentGiven'),
  );
  document.addEventListener(
    'DOMContentLoaded',
    () => record('DOMContentLoaded'),
    { once: true },
  );
})();
