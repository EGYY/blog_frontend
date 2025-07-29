import React, {
  useRef, useState, useEffect, useCallback, memo,
} from 'react';

import { Portal } from '../Portal/Portal';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './HoverCard.module.scss';

type HoverCardProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
};

export const HoverCard: React.FC<HoverCardProps> = memo(({
  trigger,
  content,
  side = 'top',
  offset = 8,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const showCard = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hideCard = () => {
    timeoutRef.current = window.setTimeout(() => {
      setVisible(false);
    }, 100);
  };

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const { scrollY } = window;
    const { scrollX } = window;

    let top = 0;
    let left = 0;

    const tryPosition = (preferred: typeof side): boolean => {
      switch (preferred) {
        case 'top':
          top = triggerRect.top - contentRect.height - offset + scrollY;
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2 + scrollX;
          break;
        case 'bottom':
          top = triggerRect.bottom + offset + scrollY;
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2 + scrollX;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2 + scrollY;
          left = triggerRect.left - contentRect.width - offset + scrollX;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2 + scrollY;
          left = triggerRect.right + offset + scrollX;
          break;
        default:
          top = triggerRect.bottom + offset + scrollY;
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2 + scrollX;
          break;
      }

      const fitsVertically = top >= scrollY && top + contentRect.height <= window.innerHeight + scrollY;
      const fitsHorizontally = left >= scrollX && left + contentRect.width <= window.innerWidth + scrollX;

      return fitsVertically && fitsHorizontally;
    };

    const sides: HoverCardProps['side'][] = [side, 'bottom', 'top', 'right', 'left'];
    sides.some((s) => s && tryPosition(s));

    setPosition({ top, left });
  }, [offset, side]);

  useEffect(() => {
    if (visible) {
      calculatePosition();
    }
  }, [calculatePosition, visible]);

  return (
    <>
      <div
        className={styles.triggerWrapper}
        ref={triggerRef}
        onMouseEnter={showCard}
        onMouseLeave={hideCard}
      >
        {trigger}
      </div>

      {visible
        && (
        <Portal>
          <div
            ref={contentRef}
            className={classNames(styles.card, { [styles.visible]: visible })}
            style={{ top: position.top, left: position.left }}
            onMouseEnter={showCard}
            onMouseLeave={hideCard}
          >
            {content}
          </div>
        </Portal>
        )}
    </>
  );
});
