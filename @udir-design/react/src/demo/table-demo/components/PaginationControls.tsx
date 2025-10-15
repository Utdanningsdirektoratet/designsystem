import { Pagination } from 'src/components/pagination/Pagination';
import { usePagination } from 'src/utilities/hooks/usePagination/usePagination';
import styles from './PaginationControls.module.scss';

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationControlsProps) => {
  const pagination = usePagination({
    currentPage,
    setCurrentPage,
    totalPages,
    showPages: totalPages,
  });

  return (
    <Pagination className={styles.pagination}>
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Button {...pagination.prevButtonProps}>
            <span className={styles.buttonText}>Forrige</span>
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
            <span className={styles.buttonText}>Neste</span>
          </Pagination.Button>
        </Pagination.Item>
      </Pagination.List>
    </Pagination>
  );
};

export default PaginationControls;
