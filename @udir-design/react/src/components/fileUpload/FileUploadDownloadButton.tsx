import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { DownloadIcon } from '@udir-design/icons';
import type { FileUploadItemButtonProps } from './FileUploadItemButton';
import { FileUploadItemButton } from './FileUploadItemButton';

export type FileUploadDownloadButtonProps = FileUploadItemButtonProps;

export const FileUploadDownloadButton = forwardRef<
  HTMLButtonElement,
  FileUploadDownloadButtonProps
>(function FileUploadDownloadButton({ className, ...rest }, ref) {
  return (
    <FileUploadItemButton
      ref={ref}
      className={cl('uds-file-upload__download-button', className)}
      icon={<DownloadIcon aria-hidden />}
      {...rest}
    />
  );
});
