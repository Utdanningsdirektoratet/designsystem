import type { usePagination as useDigdirPagination } from '@digdir/designsystemet-react';
import { describe, expect, it } from 'vitest';
import { overridePaginationAria } from './usePagination';

const createPagination = (
  currentPage: number,
  totalPages: number,
): ReturnType<typeof useDigdirPagination> => ({
  hasPrev: currentPage > 1,
  hasNext: currentPage < totalPages,
  pages: Array.from({ length: totalPages }, (_, i) => ({
    page: i + 1,
    itemKey: `page-${i + 1}`,
    buttonProps: {},
  })),
  prevButtonProps: {
    'aria-hidden': currentPage === 1,
    'aria-label': 'Previous page',
  },
  nextButtonProps: {
    'aria-hidden': currentPage === totalPages,
    'aria-label': 'Next page',
  },
});

describe('overridePaginationAria', () => {
  it('removes aria-hidden and adds aria-disabled for unavailable previous button', () => {
    const result = overridePaginationAria(createPagination(1, 3));

    expect(result.hasPrev).toBe(false);
    expect(result.prevButtonProps['aria-label']).toBe('Previous page');
    expect(result.prevButtonProps['aria-disabled']).toBe(true);
    expect(result.prevButtonProps['aria-hidden']).toBeUndefined();

    expect(result.hasNext).toBe(true);
    expect(result.nextButtonProps['aria-label']).toBe('Next page');
    expect(result.nextButtonProps['aria-disabled']).toBeUndefined();
    expect(result.nextButtonProps['aria-hidden']).toBeUndefined();
  });

  it('removes aria-hidden and adds aria-disabled for unavailable next button', () => {
    const result = overridePaginationAria(createPagination(3, 3));

    expect(result.hasPrev).toBe(true);
    expect(result.prevButtonProps['aria-label']).toBe('Previous page');
    expect(result.prevButtonProps['aria-disabled']).toBeUndefined();
    expect(result.prevButtonProps['aria-hidden']).toBeUndefined();

    expect(result.hasNext).toBe(false);
    expect(result.nextButtonProps['aria-label']).toBe('Next page');
    expect(result.nextButtonProps['aria-disabled']).toBe(true);
    expect(result.nextButtonProps['aria-hidden']).toBeUndefined();
  });

  it('keeps previous and next buttons enabled when navigation is available', () => {
    const result = overridePaginationAria(createPagination(2, 3));

    expect(result.hasPrev).toBe(true);
    expect(result.hasNext).toBe(true);
    expect(result.pages).toHaveLength(3);
    expect(result.prevButtonProps['aria-disabled']).toBeUndefined();
    expect(result.nextButtonProps['aria-disabled']).toBeUndefined();
    expect(result.prevButtonProps['aria-hidden']).toBeUndefined();
    expect(result.nextButtonProps['aria-hidden']).toBeUndefined();
  });
});
