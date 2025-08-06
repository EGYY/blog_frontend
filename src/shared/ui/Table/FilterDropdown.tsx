import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FilterIcon from '../../assets/funnel.svg';
import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { Input } from '../Input/Input';
import { Tooltip } from '../Tooltip/Tooltip';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Table.module.scss';

export const FilterDropdown = memo(
    ({
        columnKey,
        value,
        onChange,
        isFiltered,
    }: {
        columnKey: string;
        value: string;
        onChange: (v: string) => void;
        isFiltered?: boolean;
    }) => {
        const { t } = useTranslation('table');
        const [localValue, setLocalValue] = useState(value);

        useEffect(() => {
            setLocalValue(value);
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalValue(e.target.value);
        };

        const handleCommit = () => {
            onChange(localValue);
        };

        return (
            <Dropdown
                trigger={
                    <Tooltip content={t('filters')} preferredPlacement="bottom">
                        <Button theme="ghostIcon">
                            <FilterIcon
                                width={15}
                                className={classNames('', {
                                    [styles.activeFilter]: isFiltered,
                                })}
                            />
                        </Button>
                    </Tooltip>
                }
            >
                <div style={{ padding: 5 }}>
                    <Input
                        autoFocus
                        type="text"
                        placeholder={t('search')}
                        value={localValue}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleCommit();
                            }
                        }}
                    />
                    <div
                        style={{
                            marginTop: 10,
                            display: 'flex',
                            gap: 10,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            onClick={() => {
                                setLocalValue('');
                                onChange('');
                            }}
                            theme="outline"
                        >
                            {t('clear')}
                        </Button>
                        <Button onClick={handleCommit}>{t('ok')}</Button>
                    </div>
                </div>
            </Dropdown>
        );
    },
);
