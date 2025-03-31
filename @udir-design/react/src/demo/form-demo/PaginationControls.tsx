import { Pagination, usePagination } from '@udir-design/react/alpha';

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  className?: string;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
  className,
}: PaginationControlsProps) => {
  const pagination = usePagination({
    currentPage,
    setCurrentPage,
    totalPages,
    showPages: totalPages,
  });

  return (
    <Pagination className={className}>
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Button {...pagination.prevButtonProps}>
            Forrige
          </Pagination.Button>
        </Pagination.Item>
        {pagination.pages.map(({ itemKey, buttonProps, page }) => (
          <Pagination.Item key={itemKey}>
            {typeof page === 'number' && (
              <Pagination.Button {...buttonProps} aria-label={`Side ${page}`}>
                {page}
              </Pagination.Button>
            )}
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Button {...pagination.nextButtonProps}>
            Neste
          </Pagination.Button>
        </Pagination.Item>
      </Pagination.List>
    </Pagination>
  );
};

export default PaginationControls;
