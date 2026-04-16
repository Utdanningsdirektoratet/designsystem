import '@udir-design/theme';
import '@digdir/designsystemet-css';
import '@udir-design/css/components.css';
import '@udir-design/icons/style.css';
import '@udir-design/icons/css/lightBulb.css';

import ArrowRightUrl from '@udir-design/icons/svg/ArrowRight.svg?no-inline';

const container = document.getElementById('app');
if (container) {
  container.innerHTML += `
<a class="ds-link" href="#">
  <svg aria-hidden>
    <use href="${ArrowRightUrl}#icon"/>
  </svg
  ><span>Lenke lagt til dynamisk med JavaScript</span>
</a>`;
}
