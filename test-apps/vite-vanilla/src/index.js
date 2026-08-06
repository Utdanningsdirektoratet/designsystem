import '@udir-design/theme';
import '@digdir/designsystemet-css';
import '@udir-design/css/components.css';
import '@udir-design/css/baseline.css';
import '@udir-design/icons/style.css';
import '@udir-design/icons/css/lightBulb.css';

import digdirBaseCss from '@digdir/designsystemet-css/base.css?inline';
import baselineCss from '@udir-design/css/baseline.css?inline';
import ArrowRightUrl from '@udir-design/icons/svg/ArrowRight.svg?no-inline';
import PencilWritingUrl from '@udir-design/icons/svg/PencilWriting.svg?no-inline';
import DatamaskinFillUrl from '@udir-design/symbols/svg/DatamaskinFill.svg?url';
import themeCss from '@udir-design/theme?inline';

document
  .getElementById('icon-pencil')
  ?.setAttribute('href', `${PencilWritingUrl}#icon`);
document
  .getElementById('symbol-computer')
  ?.setAttribute('src', DatamaskinFillUrl);
document
  .getElementById('icon-arrow-link')
  ?.setAttribute('href', `${ArrowRightUrl}#icon`);

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

const previewMarkup = `
  <main class="preview-content">
    <h1>Vanlig HTML</h1>
    <p>Tekst, <a href="#input">lenke</a> og liste bruker dokumentets typografi.</p>
    <ul>
      <li>Første punkt</li>
      <li>Andre punkt</li>
    </ul>
    <table>
      <caption>Semantisk tabell</caption>
      <thead>
        <tr>
          <th scope="col">Element</th>
          <th scope="col">Resultat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tabell</td>
          <td>Beholder nettleserens oppsett</td>
        </tr>
      </tbody>
    </table>
    <div class="measure">100 % bredde med padding og kant</div>
    <img
      alt="Bred testillustrasjon"
      width="640"
      height="80"
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='80'%3E%3Crect width='640' height='80' fill='%23c8e6d4'/%3E%3Ctext x='16' y='48' font-family='sans-serif' font-size='24'%3E640 px bredt bilde%3C/text%3E%3C/svg%3E"
    />
    <form>
      <label for="input">Tekstfelt</label>
      <input id="input" value="Sammenlign typografien" />
      <label for="select">Valg</label>
      <select id="select">
        <option>Beholder opprinnelig utseende</option>
      </select>
      <label for="textarea">Flere linjer</label>
      <textarea id="textarea">Sammenlign typografien</textarea>
      <button type="button">Vanlig knapp</button>
    </form>
    <dialog>
      <p>Dialogen beholder nettleserens plassering og utseende.</p>
    </dialog>
  </main>
`;

const previewCss = `
  .preview-content {
    padding-inline: 0.5rem;
  }

  .measure {
    inline-size: 100%;
    margin-block: 1rem;
    border: 4px solid currentcolor;
    padding: 1rem;
  }

  form {
    display: grid;
    gap: 0.5rem;
    margin-block-start: 1rem;
  }
`;

const previewDocument = (css = '') => `
<!doctype html>
<html lang="nb">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://altinncdn.no/fonts/inter/v4/inter.css" />
    <style>${css}\n${previewCss}</style>
  </head>
  <body>${previewMarkup}</body>
</html>`;

document.querySelector('[data-baseline-preview="browser"]').srcdoc =
  previewDocument();
document.querySelector('[data-baseline-preview="udir"]').srcdoc =
  previewDocument(`${themeCss}\n${digdirBaseCss}\n${baselineCss}`);
