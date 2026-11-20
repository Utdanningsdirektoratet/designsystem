/**
 * When and where the user last chose or dropped files in a
 * `FileUpload.Dropzone` or `FileUpload.Trigger`. A file that shows up with a
 * message or loading text soon after is one the user just added, such as a
 * file of the wrong type, and has it announced. One that is there when the
 * page loads, such as from saved answers, does not: the screen reader reads
 * the page, message and all.
 */
let attachedAt = -Infinity;
let attachedIn: Element | undefined;

/** Called as the user chooses or drops files on `element`. */
export function markAttached(element: Element) {
  attachedAt = Date.now();
  attachedIn = element;
}

/**
 * Whether the user added files a moment ago, in a field that is still on the
 * page: one that has gone, such as on the page the user just left, did not
 * add the files on this one. react-dropzone hands the files on within a few
 * milliseconds; a second leaves room for a slow device.
 */
export function justAttached() {
  return Boolean(attachedIn?.isConnected) && Date.now() - attachedAt < 1000;
}
