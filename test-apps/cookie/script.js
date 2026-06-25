/**
 * Cookie consent banner — Utdanningsdirektoratet design system implementation
 * Uses native <dialog> elements with DS CSS classes.
 * Integrates with CookieInformation JS API.
 */

const cookieDialog = document.getElementById('cookie-dialog');
const detailsDialog = document.getElementById('cookie-details-dialog');
const detailsTrigger = document.getElementById('cookie-details-trigger');
const detailsClose = document.getElementById('cookie-details-close');
const coiRenewBtn = document.getElementById('Coi-Renew');

// --- Details dialog ---

detailsTrigger.addEventListener('click', () => {
  detailsDialog.showModal();
});

detailsClose.addEventListener('click', () => {
  detailsDialog.close();
});

// Close details dialog when clicking backdrop
detailsDialog.addEventListener('click', (e) => {
  if (e.target === detailsDialog) {
    detailsDialog.close();
  }
});

// --- Show/Hide banner ---

function showCookieBanner() {
  document.documentElement.classList.add('no-scroll');
  cookieDialog.showModal();
  coiRenewBtn.style.display = 'none';
}

function hideCookieBanner() {
  cookieDialog.close();
  document.documentElement.classList.remove('no-scroll');
  coiRenewBtn.style.display = '';
}

// Close main dialog on backdrop click (don't close for consent — just ignore)
cookieDialog.addEventListener('click', (e) => {
  if (e.target === cookieDialog) {
    // Don't close on backdrop for consent dialogs
  }
});
