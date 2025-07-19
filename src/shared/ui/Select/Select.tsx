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
  value?: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  error?: string
  className?: string
  multiple?: boolean
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
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const allOptions = useMemo<Option[]>(() => {
    if (groups) return groups.flatMap((group) => group.options);
    return options || [];
  }, [groups, options]);

  const isSelected = useCallback((val: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(val);
    }
    return val === value;
  }, [value, multiple]);

  const selectedLabels = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      const selected = allOptions.filter((opt) => value.includes(opt.value));
      const labelParts = selected.slice(0, 2).map((opt) => opt.label);
      const remaining = selected.length - labelParts.length;

      return remaining > 0
        ? `${labelParts.join(', ')} +${remaining}`
        : labelParts.join(', ');
    }

    const selected = allOptions.find((opt) => opt.value === value);
    return selected?.label || '';
  }, [value, allOptions, multiple]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback((val: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      if (current.includes(val)) {
        onChange(current.filter((v) => v !== val));
      } else {
        onChange([...current, val]);
      }
    } else {
      onChange(val);
      setIsOpen(false);
    }
  }, [onChange, multiple, value]);

  const renderOption = useCallback((option: Option) => {
    const selected = isSelected(option.value);
    const hovered = hoveredValue === option.value;

    return (
      <div
        key={option.value}
        className={classNames(styles.option, { [styles.hovered]: hovered })}
        onClick={() => handleSelect(option.value)}
        onMouseEnter={() => setHoveredValue(option.value)}
        onMouseLeave={() => setHoveredValue(null)}
      >
        <span>{option.label}</span>
        {selected && <CheckIcon width={15} />}
      </div>
    );
  }, [hoveredValue, handleSelect, isSelected]);

  return (
    <div className={classNames(styles.wrapper, {}, [className])} ref={ref}>
      {label && <label htmlFor="select" className={styles.label}>{label}</label>}

      <div
        className={`${styles.select} ${error ? styles.error : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={classNames(styles.selectedText, { [styles.selected]: Boolean(selectedLabels) })}>
          {selectedLabels || placeholder}
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
