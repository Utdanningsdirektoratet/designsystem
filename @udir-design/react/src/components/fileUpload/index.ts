import { FileUploadCompact } from './FileUploadCompact';
import { FileUploadDropzone } from './FileUploadDropzone';
import { FileUploadItem } from './FileUploadItem';

type FileUpload = {
  /**
   * Component that provides a file upload button.
   *
   * @example
   * <FileUpload.Compact />
   */
  Compact: typeof FileUploadCompact;
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
  Compact: FileUploadCompact,
  Dropzone: FileUploadDropzone,
  Item: FileUploadItem,
};

FileUploadComponent.Compact.displayName = 'FileUpload.Compact';
FileUploadComponent.Dropzone.displayName = 'FileUpload.Dropzone';
FileUploadComponent.Item.displayName = 'FileUpload.Item';

export type { FileUploadProps } from './FileUploadCompact';
export type { FileUploadItemProps } from './FileUploadItem';
export {
  FileUploadCompact,
  FileUploadComponent as FileUpload,
  FileUploadDropzone,
  FileUploadItem,
};
