import '@udir-design/theme/dist/index.css';
import '@digdir/designsystemet-css/dist/src/index.css';
import '@udir-design/css/dist/components.css';
import '@udir-design/icons/dist/style.css';

const ArrowRightUrl = new URL(
  'npm:@udir-design/icons/dist/svg/ArrowRight.svg',
  import.meta.url,
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
