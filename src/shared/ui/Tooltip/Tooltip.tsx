import React, {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';

import { Portal } from '../Portal/Portal';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Tooltip.module.scss';

type Placement = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  preferredPlacement?: Placement;
  className?: string
};

export const Tooltip: React.FC<TooltipProps> = memo(({
  content,
  children,
  preferredPlacement = 'top',
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<Placement>(preferredPlacement);

  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!triggerEl || !tooltipEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    const placements: Placement[] = preferredPlacement === 'top' || preferredPlacement === 'bottom'
      ? [preferredPlacement, preferredPlacement === 'top' ? 'bottom' : 'top']
      : [preferredPlacement, preferredPlacement === 'left' ? 'right' : 'left'];

    let finalPlacement = preferredPlacement;
    let finalTop = 0;
    let finalLeft = 0;

    placements.some((place) => {
      let top = 0;
      let left = 0;

      if (place === 'top') {
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      } else if (place === 'bottom') {
        top = triggerRect.bottom + 8;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      } else if (place === 'left') {
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - 8;
      } else if (place === 'right') {
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + 8;
      }

      const fits = top >= 0
        && left >= 0
        && top + tooltipRect.height <= window.innerHeight
        && left + tooltipRect.width <= window.innerWidth;

      if (fits) {
        finalPlacement = place;
        finalTop = top;
        finalLeft = left;
        return true; // stop iteration
      }

      return false;
    });

    setPlacement(finalPlacement);
    setPosition({ top: finalTop, left: finalLeft });
  }, [preferredPlacement]);

  useEffect(() => {
    if (visible) updatePosition();
  }, [visible, updatePosition]);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={classNames(styles.trigger, {}, [className])}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {children}
      </div>

      {visible
        && (
        <Portal>
          <div
            ref={tooltipRef}
            className={`${styles.tooltip} ${styles[placement]}`}
            style={{ top: position.top, left: position.left }}
            onMouseEnter={show}
            onMouseLeave={hide}
          >
            <div className={styles.arrow} data-placement={placement} />
            <div className={styles.content}>{content}</div>
          </div>
        </Portal>
        )}
    </>
  );
});
