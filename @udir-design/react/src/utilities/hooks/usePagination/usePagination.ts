import {
  type UsePaginationProps,
  usePagination as useDigdirPagination,
} from '@digdir/designsystemet-react';
import { useMemo } from 'react';

export type { UsePaginationProps };

// Overriding the hook to add aria-disabled and remove aria-hidden on prev/next buttons
// Fixes accessibility issues and communicates unavailable state instead of hiding controls: https://jira.udir.no/secure/RapidBoard.jspa?rapidView=534&projectKey=DESIGN&view=detail&selectedIssue=DESIGN-472#
export const usePagination = (props: UsePaginationProps) => {
  const pagination = useDigdirPagination(props);

  return useMemo(() => {
    return {
      ...pagination,
      prevButtonProps: pagination.prevButtonProps
        ? {
            ...pagination.prevButtonProps,
            'aria-hidden': undefined,
            'aria-disabled': !pagination.hasPrev || undefined,
          }
        : pagination.prevButtonProps,

      nextButtonProps: pagination.nextButtonProps
        ? {
            ...pagination.nextButtonProps,
            'aria-hidden': undefined,
            'aria-disabled': !pagination.hasNext || undefined,
          }
        : pagination.nextButtonProps,
    };
  }, [pagination]);
};
