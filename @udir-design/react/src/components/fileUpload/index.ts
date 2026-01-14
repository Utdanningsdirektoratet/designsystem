import { FileUploadDropzone } from './FileUploadDropzone';
import { FileUploadItem } from './FileUploadItem';
import { FileUploadTrigger } from './FileUploadTrigger';

type FileUpload = {
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

const FileUploadComponent: FileUpload = {
  Trigger: FileUploadTrigger,
  Dropzone: FileUploadDropzone,
  Item: FileUploadItem,
};

FileUploadComponent.Trigger.displayName = 'FileUpload.Trigger';
FileUploadComponent.Dropzone.displayName = 'FileUpload.Dropzone';
FileUploadComponent.Item.displayName = 'FileUpload.Item';

export type { FileUploadProps } from './FileUploadTrigger';
export type { FileUploadItemProps } from './FileUploadItem';
export {
  FileUploadComponent as FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadTrigger,
};
