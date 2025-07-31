import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '../Select/Select';

import { Column } from './Table';

type FilterColumnsProps<T> = {
    columns: Column<T>[];
    setColumns: (col: Column<T>[]) => void;
    className?: string;
};

function FilterColumnsComponent<T extends Record<string, any>>(props: FilterColumnsProps<T>) {
  const {
    setColumns,
    columns,
    className,
  } = props;
  const { t } = useTranslation('table');
  const selectedColumns = useMemo(() => {
    if (columns && columns?.length > 0) {
      return columns?.filter((column) => column.visible)?.map((column) => (String(column.key)));
    }
    return [];
  }, [columns]);

  const filterColumns = useMemo(() => {
    if (columns && columns?.length > 0) {
      return columns?.map((column) => ({ label: column.header, value: String(column.key) }));
    }
    return [];
  }, [columns]);

  const handleChangeColumnVisibility = useCallback((newSelectedKeys: string[]) => {
    const updatedColumns = columns.map((column) => {
      const columnKey = String(column.key);
      const wasSelected = selectedColumns.includes(columnKey);
      const isSelected = newSelectedKeys.includes(columnKey);

      if (wasSelected !== isSelected) {
        return { ...column, visible: !column.visible };
      }

      return column;
    });

    setColumns(updatedColumns);
  }, [columns, selectedColumns, setColumns]);

  return (
    <Select
      multiple
      value={selectedColumns}
      onChange={(val) => handleChangeColumnVisibility(val as string[])}
      options={filterColumns}
      placeholder={t('columns')}
      className={className}
      label={t('columns')}
    />
  );
}

export const FilterColumns = memo(FilterColumnsComponent) as typeof FilterColumnsComponent;
