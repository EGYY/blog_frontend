import { memo } from 'react';

import styles from './Breadcrumb.module.scss';

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
    className?: string;
};

const Breadcrumb = memo(({ items, className }: BreadcrumbProps) => {
    return (
        <nav
            className={`${styles.breadcrumb} ${className ?? ''}`}
            aria-label="Breadcrumb"
        >
            <ol className={styles.list}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className={styles.item}>
                            {!isLast && item.href ? (
                                <a href={item.href} className={styles.link}>
                                    {item.label}
                                </a>
                            ) : (
                                <span className={styles.current}>
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <span className={styles.separator}>/</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
});

export default Breadcrumb;
