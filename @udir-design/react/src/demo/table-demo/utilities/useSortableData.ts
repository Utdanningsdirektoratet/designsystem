import { useState, useMemo } from 'react';

export type SortDirection = 'ascending' | 'descending' | undefined;

function useSortableData<T>(data: T[], initialField: keyof T | null = null) {
  const [sortField, setSortField] = useState<keyof T | null>(initialField);
  const [sortDirection, setSortDirection] = useState<SortDirection>(undefined);

  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection) return data;
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField])
        return sortDirection === 'ascending' ? -1 : 1;
      if (a[sortField] > b[sortField])
        return sortDirection === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const handleSort = (field: keyof T) => {
    if (sortField === field && sortDirection === 'descending') {
      setSortField(null);
      setSortDirection(undefined);
    } else {
      setSortField(field);
      setSortDirection(
        sortField === field && sortDirection === 'ascending'
          ? 'descending'
          : 'ascending'
      );
    }
  };

  return { sortedData, sortField, sortDirection, handleSort };
}

export default useSortableData;
