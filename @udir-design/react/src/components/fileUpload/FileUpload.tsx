import { FileUploadDropzone } from './FileUploadDropzone';
import { FileUploadFileSize } from './FileUploadFileSize';
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
   * Component that provides a dropzone for file upload
   *
   * @example
   * <FileUpload.Dropzone />
   */
  Dropzone: typeof FileUploadDropzone;
  /**
   * Component that previews a file uploaded by the user.
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
  /**
   * Component that displays the size of a file with proper formatting.
   *
   * Is used automatically in `FileUpload.Item` if description is not set.
   * Useful for customising the item description while still displaying file size.
   *
   * @example
   * <FileUpload.Item
   *   file={file}
   *   onRemove={handleRemove}
   *   description={
   *     <>
   *       <FileUpload.FileSize size={file.size} />{' '}
   *       <span>Endret 23. april 2026</span>
   *     </>
   *   }
   * />
   */
  FileSize: typeof FileUploadFileSize;
};

export const FileUpload: FileUpload = {
  Trigger: FileUploadTrigger,
  Dropzone: FileUploadDropzone,
  Item: FileUploadItem,
  List: FileUploadList,
  FileSize: FileUploadFileSize,
};

FileUpload.Trigger.displayName = 'FileUpload.Trigger';
FileUpload.Dropzone.displayName = 'FileUpload.Dropzone';
FileUpload.Item.displayName = 'FileUpload.Item';
FileUpload.List.displayName = 'FileUpload.List';
FileUpload.FileSize.displayName = 'FileUpload.FileSize';
