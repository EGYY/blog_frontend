import React, {
    memo,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '../Input/Input';

import { FilterColumns } from './FilterColumns';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

import styles from './Table.module.scss';

export type SortDirection = 'asc' | 'desc' | null;

export type Column<T> = {
    key: keyof T;
    header: string;
    width?: number;
    sortable?: boolean;
    visible?: boolean;
    filterable?: boolean;
};

type TableProps<T extends Record<string, React.ReactNode>> = {
    data: T[];
    columns: Column<T>[];
    stickyColumnCount?: number;
    maxHeight?: string;
    onSort?: (key: keyof T, direction: SortDirection) => void;
    onFilter?: (filters: Record<keyof T, string>) => void;
    onSearch?: (query: string) => void;
    filterColumns?: boolean;
    className?: string;
    loading?: boolean;
};

function extractTextFromReactNode(node: ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(extractTextFromReactNode).join(' ');
    }

    if (typeof node === 'object' && node && 'props' in node) {
        return extractTextFromReactNode((node as any).props.children);
    }

    return '';
}

function TableComponent<T extends Record<string, any>>({
    data,
    columns: initialColumns,
    stickyColumnCount = 0,
    maxHeight = '500px',
    onFilter,
    onSort,
    filterColumns = false,
    className,
    loading = false,
    onSearch,
}: TableProps<T>) {
    const { t } = useTranslation('table');
    const [columns, setColumns] = useState<Column<T>[]>(
        initialColumns.map((col) => ({
            ...col,
            width: col.width || 150,
            visible: col.visible !== false,
        })),
    );
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    const resizingColIndex = useRef<number | null>(null);
    const startX = useRef(0);
    const startWidth = useRef(0);
    const visibleColumns = useMemo(
        () => columns.filter((col) => col.visible),
        [columns],
    );
    const [filters, setFilters] = useState<Record<string, string>>({});

    const handleSort = useCallback(
        (key: keyof T) => {
            let nextDirection: SortDirection;

            if (sortKey !== key) {
                nextDirection = 'asc';
            } else {
                nextDirection =
                    sortDirection === 'asc'
                        ? 'desc'
                        : sortDirection === 'desc'
                        ? null
                        : 'asc';
            }

            setSortKey(nextDirection ? key : null);
            setSortDirection(nextDirection);

            if (onSort && nextDirection) {
                onSort?.(key, nextDirection);
            }
        },
        [onSort, sortDirection, sortKey],
    );

    const handleFilterChange = useCallback(
        (key: keyof T, value: string) => {
            const newFilters = {
                ...filters,
                [key]: value,
            };

            setFilters(newFilters);

            if (onFilter) {
                const filtered = Object.fromEntries(
                    Object.entries(newFilters).filter(
                        ([, v]) => v.trim() !== '',
                    ),
                ) as Record<keyof T, string>;

                onFilter?.(filtered);
            }
        },
        [filters, onFilter],
    );

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (resizingColIndex.current === null) return;

        const delta = e.clientX - startX.current;
        const newWidth = Math.max(50, startWidth.current + delta);

        setColumns((prevCols) => {
            return prevCols.map((col, idx) =>
                idx === resizingColIndex.current
                    ? { ...col, width: newWidth }
                    : col,
            );
        });
    }, []);

    const handleMouseUp = useCallback(() => {
        resizingColIndex.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent, colIndex: number) => {
            resizingColIndex.current = colIndex;
            startX.current = e.clientX;
            startWidth.current = columns[colIndex].width || 150;

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        },
        [columns, handleMouseMove, handleMouseUp],
    );

    const getLeftOffset = useCallback(
        (index: number) => {
            return columns
                .slice(0, index)
                .reduce((sum, col) => sum + (col.width || 150), 0);
        },
        [columns],
    );

    const filteredData = useMemo(() => {
        if (onFilter) return data;

        return data.filter((row) => {
            return visibleColumns.every((col) => {
                if (!col.filterable) return true;

                const filterValue =
                    filters[String(col.key)]?.toLowerCase() ?? '';
                const rawCell = row[col.key];
                const cellValue =
                    extractTextFromReactNode(rawCell).toLowerCase();

                return cellValue.includes(filterValue);
            });
        });
    }, [data, filters, visibleColumns, onFilter]);

    const sortedData = useMemo(() => {
        if (onSort || !sortKey || !sortDirection) return filteredData;

        return [...filteredData].sort((a, b) => {
            const valA = extractTextFromReactNode(a[sortKey]);
            const valB = extractTextFromReactNode(b[sortKey]);

            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortDirection === 'asc' ? valA - valB : valB - valA;
            }

            return sortDirection === 'asc'
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA));
        });
    }, [filteredData, sortKey, sortDirection, onSort]);

    return (
        <div className={className}>
            <div className={styles.tableMainActions}>
                {onSearch && (
                    <Input
                        placeholder={t('search')}
                        className={styles.searchAction}
                        label={t('search')}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                )}
                {filterColumns && (
                    <FilterColumns
                        columns={columns}
                        setColumns={setColumns}
                        className={styles.filterColumnsAction}
                    />
                )}
            </div>
            <div className={styles.container} style={{ maxHeight }}>
                <table className={styles.table}>
                    <TableHeader
                        columns={columns}
                        filters={filters}
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        stickyColumnCount={stickyColumnCount}
                        getLeftOffset={getLeftOffset}
                        handleSort={handleSort}
                        handleFilterChange={handleFilterChange}
                        handleMouseDown={handleMouseDown}
                    />
                    <TableBody
                        sortedData={sortedData}
                        visibleColumns={visibleColumns}
                        stickyColumnCount={stickyColumnCount}
                        getLeftOffset={getLeftOffset}
                        columns={columns}
                        loading={loading}
                    />
                </table>
            </div>
        </div>
    );
}

export const Table = memo(TableComponent) as typeof TableComponent;
