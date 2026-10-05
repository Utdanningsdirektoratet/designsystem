import { forwardRef } from 'react';
import { DownloadIcon } from '@udir-design/icons';
import type { FileUploadItemButtonProps } from './FileUploadItemButton';
import { FileUploadItemButton } from './FileUploadItemButton';

export type FileUploadDownloadButtonProps = FileUploadItemButtonProps;

export const FileUploadDownloadButton = forwardRef<
  HTMLButtonElement,
  FileUploadDownloadButtonProps
>(function FileUploadDownloadButton(props, ref) {
  return (
    <FileUploadItemButton
      ref={ref}
      kind="download"
      icon={<DownloadIcon aria-hidden />}
      {...props}
    />
  );
});
