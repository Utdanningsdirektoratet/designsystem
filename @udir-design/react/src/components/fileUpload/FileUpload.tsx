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
   * uploaded by the user
   *
   * @example
   * <FileUpload.Item />
   */
  Item: typeof FileUploadItem;
  /**
   * Component that displays multiple uploaded files
   * in a compact list with dividers
   *
   * @example
   * <FileUpload.List items={items} onRemove={handleRemove} />
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
