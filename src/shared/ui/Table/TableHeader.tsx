import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowDownUp from '../../assets/arrow-down-up.svg';
import ArrowDesc from '../../assets/arrow-down-wide-narrow.svg';
import ArrowAsc from '../../assets/arrow-up-narrow-wide.svg';
import { Button } from '../Button/Button';
import { Tooltip } from '../Tooltip/Tooltip';

import { FilterDropdown } from './FilterDropdown';
import { Column, SortDirection } from './Table';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Table.module.scss';

type TableHeaderProps<T> = {
    columns: Column<T>[];
    filters: Record<string, string>;
    sortKey: keyof T | null;
    sortDirection: SortDirection;
    stickyColumnCount: number;
    getLeftOffset: (index: number) => number;
    handleSort: (key: keyof T) => void;
    handleFilterChange: (key: keyof T, value: string) => void;
    handleMouseDown: (e: React.MouseEvent, colIndex: number) => void;
};

function TableHeaderComponent<T extends Record<string, any>>(
    props: TableHeaderProps<T>,
) {
    const {
        columns,
        filters,
        sortKey,
        sortDirection,
        stickyColumnCount,
        getLeftOffset,
        handleSort,
        handleFilterChange,
        handleMouseDown,
    } = props;
    const { t } = useTranslation('table');
    return (
        <thead className={styles.thead}>
            <tr>
                {columns
                    .filter((col) => col.visible)
                    .map((col) => {
                        const colIndex = columns.findIndex(
                            (c) => c.key === col.key,
                        );
                        const isSorted = sortKey === col.key;
                        const isSticky = colIndex < stickyColumnCount;
                        const isFiltered = Boolean(filters[String(col.key)]);
                        return (
                            <th
                                key={String(col.key)}
                                className={classNames(styles.th, {
                                    [styles.sticky]: isSticky,
                                    [styles.stickyHeader]: isSticky,
                                })}
                                style={{
                                    width: `${col.width}px`,
                                    left: isSticky
                                        ? `${getLeftOffset(colIndex)}px`
                                        : undefined,
                                }}
                            >
                                <div className={styles.thContent}>
                                    <span>{col.header}</span>
                                    <div className={styles.thActions}>
                                        {col.sortable && (
                                            <Tooltip
                                                content={
                                                    isSorted &&
                                                    sortDirection === 'asc'
                                                        ? t('asc_sort')
                                                        : isSorted &&
                                                          sortDirection ===
                                                              'desc'
                                                        ? t('desc_sort')
                                                        : t('default_sort')
                                                }
                                                preferredPlacement="bottom"
                                            >
                                                <Button
                                                    theme="ghostIcon"
                                                    onClick={() =>
                                                        col.sortable &&
                                                        handleSort(col.key)
                                                    }
                                                >
                                                    {isSorted &&
                                                    sortDirection === 'asc' ? (
                                                        <ArrowAsc
                                                            className={
                                                                styles.activeFilter
                                                            }
                                                            width={15}
                                                        />
                                                    ) : isSorted &&
                                                      sortDirection ===
                                                          'desc' ? (
                                                        <ArrowDesc
                                                            className={
                                                                styles.activeFilter
                                                            }
                                                            width={15}
                                                        />
                                                    ) : (
                                                        <ArrowDownUp
                                                            width={15}
                                                        />
                                                    )}
                                                </Button>
                                            </Tooltip>
                                        )}
                                        {col.filterable && (
                                            <FilterDropdown
                                                isFiltered={isFiltered}
                                                columnKey={String(col.key)}
                                                onChange={(val) => {
                                                    handleFilterChange(
                                                        col.key,
                                                        val,
                                                    );
                                                }}
                                                value={
                                                    filters[String(col.key)] ??
                                                    ''
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={styles.resizeHandle}
                                    onMouseDown={(e) =>
                                        handleMouseDown(e, colIndex)
                                    }
                                />
                            </th>
                        );
                    })}
            </tr>
        </thead>
    );
}

export const TableHeader = memo(
    TableHeaderComponent,
) as typeof TableHeaderComponent;
