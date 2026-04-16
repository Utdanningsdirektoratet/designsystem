import '@udir-design/theme/dist/index.css';
import '@digdir/designsystemet-css/dist/src/index.css';
import '@udir-design/css/dist/components.css';
import '@udir-design/icons/dist/style.css';

import PencilWritingUrl from '@udir-design/icons/dist/svg/PencilWriting.svg?url';
import ArrowRightUrl from '@udir-design/icons/dist/svg/ArrowRight.svg?url';
import DatamaskinFillUrl from '@udir-design/symbols/dist/svg/DatamaskinFill.svg?url';
import LightBulbUrl from '@udir-design/icons/dist/svg/LightBulb.svg?url';

document.getElementById('icon-pencil')?.setAttribute('href', `${PencilWritingUrl}#icon`);
document.getElementById('symbol-computer')?.setAttribute('href', `${DatamaskinFillUrl}#symbol`);
document.getElementById('icon-arrow-link')?.setAttribute('href', `${ArrowRightUrl}#icon`);

document.documentElement.style.setProperty(
  '--icon-lightbulb-url',
  `url('${LightBulbUrl}')`,
);

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
