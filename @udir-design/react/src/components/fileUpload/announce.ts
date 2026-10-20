type Entry =
  | { text: string }
  | { message: string; lang: string; fileNames: string[] };

interface Region {
  element: HTMLElement;
  timer: number;
  /** Waiting to be set, in the order they came. */
  pending: Entry[];
}

/**
 * One region for the page, and one for each dialog with files in it: while a
 * modal dialog is open, the rest of the page is inert, and a screen reader
 * hears nothing from a region there. Outside every list, so it stays when the
 * consumer hides a list that is left empty, and is in place before a file
 * that was just added has anything to say. Found by the dialog or page, and by
 * the region's element.
 */
const regions = new WeakMap<Element, Region>();
const byElement = new WeakMap<HTMLElement, Region>();

/**
 * Puts the region for where `element` is in place before it has anything to
 * say, since a screen reader only announces what changes in a region it
 * already knows about: the region in the nearest dialog, native or with
 * `aria-modal`, or else the one for the page.
 */
export function prepareAnnouncements(element: Element) {
  const container =
    element.closest('dialog, [aria-modal="true"]') ?? document.body;
  let region = regions.get(container);
  if (!region) {
    const status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.className = 'ds-sr-only';
    region = { element: status, timer: 0, pending: [] };
    regions.set(container, region);
    byElement.set(status, region);
  }
  if (region.element.parentNode !== container) container.append(region.element);
  return region.element;
}

/**
 * Announces a text, such as that a file was removed, in a region from
 * `prepareAnnouncements`.
 */
export function announce(text: string, region: HTMLElement) {
  const { pending } = regionFor(region);
  /* Once is enough, such as when React runs an effect twice in development. */
  if (pending.some((entry) => 'text' in entry && entry.text === text)) return;
  queue(region, { text });
}

/**
 * Announces the message on a file. Files with the same message are announced
 * as one sentence, such as "a.ics, b.pdf og c.rtf: Filformatet støttes ikke".
 * VoiceOver read texts that came one after another as one line, and did not
 * always pause between one file's message and the next file's name, even with
 * a full stop between them. The list follows the `lang` of `element`, and
 * goes to the region for where `element` is.
 */
export function announceMessage(
  fileName: string,
  message: string,
  element: Element,
) {
  const lang = element.closest('[lang]')?.getAttribute('lang') ?? '';
  const region = prepareAnnouncements(element);
  for (const entry of regionFor(region).pending) {
    if (
      'message' in entry &&
      entry.message === message &&
      entry.lang === lang
    ) {
      if (!entry.fileNames.includes(fileName)) entry.fileNames.push(fileName);
      return;
    }
  }
  queue(region, { message, lang, fileNames: [fileName] });
}

function regionFor(element: HTMLElement) {
  const region = byElement.get(element);
  if (!region) throw new Error('Not a region from `prepareAnnouncements`');
  return region;
}

/**
 * Sets the text half a second after the first call. VoiceOver in Safari read
 * a removal after the next file's button when it came right away, but dropped
 * it when focus went to an upload field, as the consumer does when the list is
 * left empty. Half a second later, it read the field and then the text. It
 * also dropped the message on a file that had just been dropped, when the
 * text came as the file appeared.
 *
 * What comes in the meantime, such as the files in a drop, is announced along
 * with it rather than in its place, each ended as a sentence.
 */
function queue(element: HTMLElement, entry: Entry) {
  const region = regionFor(element);
  region.pending.push(entry);
  if (region.pending.length > 1) return;

  clearTimeout(region.timer);
  region.timer = window.setTimeout(() => {
    const texts = region.pending.map((entry) => {
      const text =
        'text' in entry
          ? entry.text
          : `${new Intl.ListFormat(entry.lang || undefined, { type: 'conjunction' }).format(entry.fileNames)}: ${entry.message}`;
      return /[.!?…]$/.test(text) ? text : `${text}.`;
    });
    region.pending = [];
    /* The same text again may not be read again, so it is told apart by a
       non-breaking space. */
    if (element.textContent === texts.join('')) {
      texts[texts.length - 1] += '\u00a0';
    }
    element.replaceChildren(
      ...texts.map((text) => {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
      }),
    );
    /* Emptied again, so the text is not found later when reading the page. */
    region.timer = window.setTimeout(() => element.replaceChildren(), 5000);
  }, 500);
}
