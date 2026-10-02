/**
 * Downloads a file the browser already holds, such as one the user has just
 * attached, under its own name.
 *
 * `FileUpload` never downloads anything by itself. Call this from the `onClick`
 * of a `FileUpload.DownloadButton`, so you know when the user has downloaded
 * the file.
 *
 * @example
 * <FileUpload.DownloadButton
 *   fileName={file.name}
 *   onClick={() => downloadFile(file)}
 * />
 */
export const downloadFile = (file: File): void => {
  const a = document.createElement('a');
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = file.name;
  a.click();

  URL.revokeObjectURL(url);
};
