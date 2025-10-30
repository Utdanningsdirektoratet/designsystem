import { Pagination } from '../../../components/pagination/Pagination';
import { usePagination } from '../../../utilities/hooks/usePagination/usePagination';
import styles from './PaginationControls.module.scss';

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
