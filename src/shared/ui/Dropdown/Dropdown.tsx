import React, {
  useState, useRef, useEffect, useCallback, useMemo, memo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import styles from './Dropdown.module.scss';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
  }

export const Dropdown: React.FC<DropdownProps> = memo(({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !dropdownRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = triggerRect.bottom;
    let { left } = triggerRect;

    const fitsBelow = top + dropdownRect.height <= viewportHeight;
    const fitsAbove = triggerRect.top - dropdownRect.height >= 0;
    const fitsRight = left + dropdownRect.width <= viewportWidth;
    const fitsLeft = triggerRect.right - dropdownRect.width >= 0;

    if (!fitsBelow && fitsAbove) {
      top = triggerRect.top - dropdownRect.height;
    } else if (!fitsBelow && !fitsAbove) {
      setIsVisible(false);
      return;
    }

    if (!fitsRight && fitsLeft) {
      left = triggerRect.right - dropdownRect.width;
    } else if (!fitsRight && !fitsLeft) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setPosition({ top, left });
  }, []);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
    }
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isOpen, calculatePosition]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      triggerRef.current
        && dropdownRef.current
        && !triggerRef.current.contains(event.target as Node)
        && !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const dropdownContent = useMemo(
    () => isOpen && isVisible && (
    <Portal>
      <div
        ref={dropdownRef}
        className={classNames(styles.dropdownMenu)}
        style={{ top: position.top, left: position.left }}
      >
        {children}
      </div>
    </Portal>
    ),
    [isOpen, isVisible, position.top, position.left, children],
  );

  return (
    <div className={styles.dropdownWrapper}>
      <div
        ref={triggerRef}
        className={classNames(styles.trigger)}
        onClick={toggleDropdown}
      >
        {trigger}
      </div>
      {dropdownContent}
    </div>
  );
});
