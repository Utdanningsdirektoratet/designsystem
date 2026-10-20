/**
 * One region for the whole page, outside every list, so it stays when the
 * consumer hides a list that is left empty, and is in place before a file
 * that was just added has anything to say.
 */
let status: HTMLElement | undefined;
let statusTimer = 0;
/** Waiting to be set, in the order they came. */
let pending: (
  | { text: string }
  | { message: string; lang: string; fileNames: string[] }
)[] = [];

/**
 * Puts the region in place before it has anything to say, since a screen
 * reader only announces what changes in a region it already knows about.
 */
export function prepareAnnouncements() {
  if (!status) {
    status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.className = 'ds-sr-only';
  }
  if (!status.isConnected) document.body.append(status);
  return status;
}

/** Announces a text, such as that a file was removed. */
export function announce(text: string) {
  /* Once is enough, such as when React runs an effect twice in development. */
  if (pending.some((entry) => 'text' in entry && entry.text === text)) return;
  queue({ text });
}

/**
 * Announces the message on a file. Files with the same message are announced
 * as one sentence, such as "a.ics, b.pdf og c.rtf: Filformatet støttes ikke".
 * VoiceOver read texts that came one after another as one line, and did not
 * always pause between one file's message and the next file's name, even with
 * a full stop between them. The list follows the `lang` of `element`.
 */
export function announceMessage(
  fileName: string,
  message: string,
  element: Element,
) {
  const lang = element.closest('[lang]')?.getAttribute('lang') ?? '';
  for (const entry of pending) {
    if (
      'message' in entry &&
      entry.message === message &&
      entry.lang === lang
    ) {
      if (!entry.fileNames.includes(fileName)) entry.fileNames.push(fileName);
      return;
    }
  }
  queue({ message, lang, fileNames: [fileName] });
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
function queue(entry: (typeof pending)[number]) {
  const region = prepareAnnouncements();
  pending.push(entry);
  if (pending.length > 1) return;

  clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    const texts = pending.map((entry) => {
      const text =
        'text' in entry
          ? entry.text
          : `${new Intl.ListFormat(entry.lang || undefined, { type: 'conjunction' }).format(entry.fileNames)}: ${entry.message}`;
      return /[.!?…]$/.test(text) ? text : `${text}.`;
    });
    pending = [];
    /* The same text again may not be read again, so it is told apart by a
       non-breaking space. */
    if (region.textContent === texts.join('')) {
      texts[texts.length - 1] += '\u00a0';
    }
    region.replaceChildren(
      ...texts.map((text) => {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
      }),
    );
    /* Emptied again, so the text is not found later when reading the page. */
    statusTimer = window.setTimeout(() => region.replaceChildren(), 5000);
  }, 500);
}
