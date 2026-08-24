import { FileUploadDropzone } from './FileUploadDropzone';
import { FileUploadItem } from './FileUploadItem';
import { FileUploadList } from './FileUploadList';
import { FileUploadTrigger } from './FileUploadTrigger';

export type FileUpload = {
  /**
   * Component that provides a file upload button.
   *
   * @example
   * <FileUpload.Trigger />
   */
  Trigger: typeof FileUploadTrigger;
  /**
   * Component that provides a dropzone
   * for file upload
   *
   * @example
   * <FileUpload.Dropzone />
   */
  Dropzone: typeof FileUploadDropzone;
  /**
   * Component that previews a file
   * uploaded by the user.
   *
   * Must be placed inside a `FileUpload.List`.
   *
   * @example
   * <FileUpload.Item />
   */
  Item: typeof FileUploadItem;
  /**
   * Component that groups uploaded files as a list.
   *
   * Use `variant` to switch between one card per file (`default`) and a single
   * card with the files divided by lines (`compact`).
   *
   * @example
   * <FileUpload.List variant="compact">
   *   <FileUpload.Item file={file} onRemove={handleRemove} />
   * </FileUpload.List>
   */
  List: typeof FileUploadList;
};

export const FileUpload: FileUpload = {
  Trigger: FileUploadTrigger,
  Dropzone: FileUploadDropzone,
  Item: FileUploadItem,
  List: FileUploadList,
};

FileUpload.Trigger.displayName = 'FileUpload.Trigger';
FileUpload.Dropzone.displayName = 'FileUpload.Dropzone';
FileUpload.Item.displayName = 'FileUpload.Item';
FileUpload.List.displayName = 'FileUpload.List';
