import { forwardRef } from 'react';
import { DownloadIcon } from '@udir-design/icons';
import type { FileUploadItemButtonProps } from './FileUploadItemButton';
import { ItemButton } from './FileUploadItemButton';

export type FileUploadDownloadButtonProps = Omit<
  FileUploadItemButtonProps,
  'icon' | 'tooltip'
>;

export const FileUploadDownloadButton = forwardRef<
  HTMLButtonElement,
  FileUploadDownloadButtonProps
>(function FileUploadDownloadButton(props, ref) {
  return (
    <ItemButton
      ref={ref}
      kind="download"
      icon={<DownloadIcon aria-hidden />}
      {...props}
    />
  );
});
