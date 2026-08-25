import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FileUploadFileSize, formatFileSize } from './FileUploadFileSize';

afterEach(cleanup);

describe('formatFileSize', () => {
  it('should return blank for empty files', () => {
    expect(formatFileSize(0, 'nb-NO')).toBeNull();
  });
  it('should format files under 1 KB as whole bytes', () => {
    expect(formatFileSize(1, 'nb-NO')).toBe('1 byte');

    expect(formatFileSize(100, 'nb-NO')).toBe('100 bytes');

    expect(formatFileSize(999, 'nb-NO')).toBe('999 bytes');
  });

  it('should format files between 1 KB and 1 MB as whole KB', () => {
    expect(formatFileSize(1024 * 1.1, 'nb-NO')).toBe('1 KB');

    expect(formatFileSize(1024 * 1.5, 'nb-NO')).toBe('2 KB');

    expect(formatFileSize(1024 * 2, 'nb-NO')).toBe('2 KB');
  });

  it('should format files from 1 MB and above as MB with maximum 2 fraction digits', () => {
    expect(formatFileSize(1024 * 1024, 'nb-NO')).toBe('1 MB');

    expect(formatFileSize(1024 * 1024 + 1, 'nb-NO')).toBe('1 MB');

    expect(formatFileSize(1024 * 1024 * 1.875, 'nb-NO')).toBe('1,88 MB');

    expect(formatFileSize(1024 * 1024 * 2, 'nb-NO')).toBe('2 MB');

    expect(formatFileSize(1024 * 1024 * 2.3, 'nb-NO')).toBe('2,3 MB');
  });

  it('formats decimals and thousands separators correctly in English and Norwegian', () => {
    const fileSize = 1024 * 1024 * 1234.56;
    expect(formatFileSize(fileSize, 'nb-NO')).toBe('1 234,56 MB');
    expect(formatFileSize(fileSize, 'en')).toBe('1,234.56 MB');
  });
});

describe('FileUpload.FileSize', () => {
  it('forwards lang attribute to the underlying span element', () => {
    const testId = 'fileSize';
    render(
      <FileUploadFileSize size={1024} lang="nn-NO" data-testid={testId} />,
    );

    expect(screen.getByTestId(testId)).toHaveAttribute('lang', 'nn-NO');
  });

  it('picks up the nearest lang attribute', () => {
    const bigFileSize = 1024 * 1024 * 1234.56;
    const testId = 'big-file-size';

    render(
      <ul lang="en">
        <li lang="de-DE">
          <FileUploadFileSize size={bigFileSize} data-testid={testId} />
        </li>
      </ul>,
    );

    // german number formatting
    expect(screen.getByTestId(testId)).toHaveTextContent('1.234,56');
  });

  it('falls back to nb-NO if no lang is set in the document', () => {
    const originalLang = document.documentElement.lang;
    document.documentElement.lang = '';

    const bigFileSize = 1024 * 1024 * 1234.56;
    const testId = 'big-file-size';

    render(<FileUploadFileSize size={bigFileSize} data-testid={testId} />);

    try {
      // norwegian number formatting
      expect(screen.getByTestId(testId)).toHaveTextContent('1 234,56');
    } finally {
      document.documentElement.lang = originalLang;
    }
  });
});
