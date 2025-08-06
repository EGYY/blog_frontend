/* eslint-disable i18next/no-literal-string */
import React, { useMemo, useCallback } from 'react';

import { Button } from '../Button/Button';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Pagination.module.scss';

const PaginationButton = React.memo(
    ({
        page,
        isActive,
        onClick,
    }: {
        page: number;
        isActive: boolean;
        onClick: (page: number) => void;
    }) => {
        return (
            <Button
                key={page}
                theme={isActive ? 'default' : 'ghost'}
                onClick={() => onClick(page)}
            >
                {page}
            </Button>
        );
    },
);

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisible?: number;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = 5,
    className,
}) => {
    const half = useMemo(() => Math.floor(maxVisible / 2), [maxVisible]);

    const pages = useMemo(() => {
        const list: number[] = [];
        let start = Math.max(currentPage - half, 1);
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - maxVisible + 1, 1);
        }

        for (let i = start; i <= end; i++) {
            list.push(i);
        }

        return list;
    }, [currentPage, half, maxVisible, totalPages]);

    const handlePageClick = useCallback(
        (page: number) => {
            if (page !== currentPage) {
                onPageChange(page);
            }
        },
        [onPageChange, currentPage],
    );

    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;

    return (
        <div className={classNames(styles.pagination, {}, [className])}>
            <Button
                theme="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={prevDisabled}
            >
                ←
            </Button>

            {pages[0] > 1 && (
                <>
                    <PaginationButton
                        page={1}
                        isActive={currentPage === 1}
                        onClick={handlePageClick}
                    />
                    {pages[0] > 2 && <span className={styles.dots}>…</span>}
                </>
            )}

            {pages.map((page) => (
                <PaginationButton
                    key={page}
                    page={page}
                    isActive={page === currentPage}
                    onClick={handlePageClick}
                />
            ))}

            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && (
                        <span className={styles.dots}>…</span>
                    )}
                    <PaginationButton
                        page={totalPages}
                        isActive={totalPages === currentPage}
                        onClick={handlePageClick}
                    />
                </>
            )}

            <Button
                theme="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={nextDisabled}
            >
                →
            </Button>
        </div>
    );
};

export default React.memo(Pagination);
