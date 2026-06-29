import { usePagination as useDigdirPagination } from '@digdir/designsystemet-react';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UsePaginationProps } from './usePagination';
import { usePagination } from './usePagination';

vi.mock('@digdir/designsystemet-react', () => ({
  usePagination: vi.fn(),
}));

const mockedUseDigdirPagination = vi.mocked(useDigdirPagination);

describe('usePagination', () => {
  beforeEach(() => {
    mockedUseDigdirPagination.mockReset();
    mockedUseDigdirPagination.mockImplementation(
      (props) =>
        ({
          hasPrev: props.currentPage > 1,
          hasNext: props.currentPage < props.totalPages,
          pages: Array.from({ length: props.totalPages }, (_, i) => ({
            page: i + 1,
            itemKey: `page-${i + 1}`,
            buttonProps: {},
          })),
          prevButtonProps: {
            'aria-hidden': props.currentPage === 1,
            'aria-label': 'Previous page',
          },
          nextButtonProps: {
            'aria-hidden': props.currentPage === props.totalPages,
            'aria-label': 'Next page',
          },
        }) satisfies ReturnType<typeof useDigdirPagination>,
    );
  });

  it('removes aria-hidden and adds aria-disabled for unavailable previous button', () => {
    const props: UsePaginationProps = { currentPage: 1, totalPages: 3 };
    const { result } = renderHook(() => usePagination(props));

    expect(mockedUseDigdirPagination).toHaveBeenCalledWith(props);
    expect(result.current.hasPrev).toBe(false);
    expect(result.current.prevButtonProps['aria-label']).toBe('Previous page');
    expect(result.current.prevButtonProps['aria-disabled']).toBe(true);
    expect(result.current.prevButtonProps['aria-hidden']).toBeUndefined();

    expect(result.current.hasNext).toBe(true);
    expect(result.current.nextButtonProps['aria-label']).toBe('Next page');
    expect(result.current.nextButtonProps['aria-disabled']).toBeUndefined();
    expect(result.current.nextButtonProps['aria-hidden']).toBeUndefined();
  });

  it('removes aria-hidden and adds aria-disabled for unavailable next button', () => {
    const props: UsePaginationProps = { currentPage: 3, totalPages: 3 };
    const { result } = renderHook(() => usePagination(props));

    expect(mockedUseDigdirPagination).toHaveBeenCalledWith(props);
    expect(result.current.hasPrev).toBe(true);
    expect(result.current.prevButtonProps['aria-label']).toBe('Previous page');
    expect(result.current.prevButtonProps['aria-disabled']).toBeUndefined();
    expect(result.current.prevButtonProps['aria-hidden']).toBeUndefined();

    expect(result.current.hasNext).toBe(false);
    expect(result.current.nextButtonProps['aria-label']).toBe('Next page');
    expect(result.current.nextButtonProps['aria-disabled']).toBe(true);
    expect(result.current.nextButtonProps['aria-hidden']).toBeUndefined();
  });

  it('keeps previous and next buttons enabled when navigation is available', () => {
    const props: UsePaginationProps = { currentPage: 2, totalPages: 3 };
    const { result } = renderHook(() => usePagination(props));

    expect(result.current.hasPrev).toBe(true);
    expect(result.current.hasNext).toBe(true);
    expect(result.current.pages).toHaveLength(3);
    expect(result.current.prevButtonProps['aria-disabled']).toBeUndefined();
    expect(result.current.nextButtonProps['aria-disabled']).toBeUndefined();
    expect(result.current.prevButtonProps['aria-hidden']).toBeUndefined();
    expect(result.current.nextButtonProps['aria-hidden']).toBeUndefined();
  });
});
