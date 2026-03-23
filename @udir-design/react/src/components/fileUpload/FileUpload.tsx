import { FileUploadDropzone } from './FileUploadDropzone';
import { FileUploadItem } from './FileUploadItem';
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
   * uploaded by the user
   *
   * @example
   * <FileUpload.Item />
   */
  Item: typeof FileUploadItem;
};

export const FileUpload: FileUpload = {
  Trigger: FileUploadTrigger,
  Dropzone: FileUploadDropzone,
  Item: FileUploadItem,
};

FileUpload.Trigger.displayName = 'FileUpload.Trigger';
FileUpload.Dropzone.displayName = 'FileUpload.Dropzone';
FileUpload.Item.displayName = 'FileUpload.Item';
