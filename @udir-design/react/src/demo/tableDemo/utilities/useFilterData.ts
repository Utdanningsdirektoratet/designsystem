import { useMemo, useState } from 'react';

export function useFilterData<T>(
  data: T[],
  initialFilters: Partial<Record<keyof T, unknown>> = {}
) {
  const [filters, setFilters] =
    useState<Partial<Record<keyof T, unknown>>>(initialFilters);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([field, filterValue]) => {
        // If the filter value is blank, we should not filter on this field.
        if (!filterValue || filterValue === 'blank') return true;

        const itemValue = item[field as keyof T];

        // If both the item value and the filter value are strings, we do a case-insensitive
        if (typeof itemValue === 'string' && typeof filterValue === 'string') {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase());
        }

        // If other types, we do a strict comparison.
        return itemValue === filterValue;
      });
    });
  }, [data, filters]);

  const updateFilter = <K extends keyof T>(field: K, value: unknown) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilter = <K extends keyof T>(field: K) => {
    setFilters((prev) => ({ ...prev, [field]: undefined }));
  };

  return { filteredData, filters, updateFilter, clearFilter, setFilters };
}
