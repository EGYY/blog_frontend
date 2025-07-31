import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import SpinIcon from '../../assets/spin.svg';

import { Column } from './Table';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Table.module.scss';

type TableBodyProps<T> = {
    sortedData: T[];
    visibleColumns: Column<T>[];
    columns: Column<T>[];
    stickyColumnCount: number;
    getLeftOffset: (index: number) => number;
    loading?: boolean;
};

function TableBodyComponent<T extends Record<string, any>>(props: TableBodyProps<T>) {
  const {
    sortedData,
    visibleColumns,
    stickyColumnCount,
    getLeftOffset,
    columns,
    loading,
  } = props;
  const { t } = useTranslation('table');

  if (loading) {
    return (
      <tbody>
        <tr>
          <td
            className={styles.tdNoContent}
            colSpan={visibleColumns.length}
          >
            <SpinIcon className="spin" width={24} height={24} />
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {sortedData.length > 0 ? sortedData.map((row, rowIdx) => (
        <tr key={rowIdx}>
          {visibleColumns.map((col) => {
            const colIndex = columns.findIndex((c) => c.key === col.key);
            return (
              <td
                key={String(col.key)}
                className={classNames(styles.td, { [styles.sticky]: colIndex < stickyColumnCount })}
                style={{
                  width: `${col.width}px`,
                  left: colIndex < stickyColumnCount ? `${getLeftOffset(colIndex)}px` : undefined,
                }}
              >
                {row[col.key]}
              </td>
            );
          })}
        </tr>
      )) : (
        <tr>
          <td
            className={styles.tdNoContent}
            colSpan={visibleColumns.length}
          >
            {t('data_empty')}
          </td>
        </tr>
      )}
    </tbody>
  );
}

export const TableBody = memo(TableBodyComponent) as typeof TableBodyComponent;
