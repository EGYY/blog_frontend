import React, {
  useState, useRef, useEffect, memo, useMemo, useCallback,
} from 'react';
import ChevronDownIcon from '../../assets/chevron-down.svg';
import CheckIcon from '../../assets/check.svg';
import styles from './Select.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface Option {
  label: string
  value: string
}

interface OptionGroup {
  label: string
  options: Option[]
}

type SelectProps = {
  label?: string
  groups?: OptionGroup[]
  options?: Option[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
}

export const Select: React.FC<SelectProps> = memo(({
  label,
  groups,
  options,
  value,
  onChange,
  placeholder = 'Выберите значение',
  error,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const allOptions = useMemo<Option[]>(() => {
    if (groups) return groups.flatMap((group) => group.options);
    return options || [];
  }, [groups, options]);

  const selectedOption = useMemo(
    () => allOptions.find((opt) => opt.value === value),
    [allOptions, value],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderOption = useCallback((option: Option) => {
    const isSelected = option.value === value;
    const isHovered = hoveredValue === option.value;

    return (
      <div
        key={option.value}
        className={classNames(styles.option, { [styles.hovered]: isHovered })}
        onClick={() => {
          onChange(option.value);
          setIsOpen(false);
        }}
        onMouseEnter={() => setHoveredValue(option.value)}
        onMouseLeave={() => setHoveredValue(null)}
      >
        <span>{option.label}</span>
        {isSelected && <CheckIcon width={15} />}
      </div>
    );
  }, [hoveredValue, onChange, value]);

  return (
    <div className={classNames(styles.wrapper, {}, [className])} ref={ref}>
      {label && <label htmlFor="select" className={styles.label}>{label}</label>}

      <div
        className={`${styles.select} ${error ? styles.error : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.selectedText}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDownIcon width={20} />
      </div>

      <div className={`${styles.dropdownWrapper} ${isOpen ? styles.open : ''}`}>
        <div className={styles.dropdown}>
          {groups
            ? groups.map((group) => (
              <div key={group.label}>
                <div className={styles.groupLabel}>{group.label}</div>
                {group.options.map(renderOption)}
              </div>
            ))
            : options?.map(renderOption)}
        </div>
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
});
