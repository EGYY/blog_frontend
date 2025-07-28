import React, {
  useRef, useState, useCallback, useMemo, useEffect, memo,
} from 'react';
import ChevronLeft from '@/shared/assets/chevron-left.svg';
import ChevronRight from '@/shared/assets/chevron-right.svg';
import styles from './Carousel.module.scss';
import { Button } from '../Button/Button';

interface Breakpoints {
  [width: number]: number;
}

interface CarouselProps {
  children: React.ReactNode;
  itemsPerView?: number; // если breakpoints не заданы
  breakpoints?: Breakpoints;
}

const getItemsPerView = (width: number, breakpoints: Breakpoints): number => {
  const sorted = Object.entries(breakpoints)
    .map(([k, v]) => [+(k), v] as [number, number])
    .sort((a, b) => a[0] - b[0]);

  let result = 1;
  result = sorted.reduce((acc, [minWidth, count]) => (width >= minWidth ? count : acc), result);
  return result;
};

export const Carousel: React.FC<CarouselProps> = memo(({ children, itemsPerView = 1, breakpoints }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemsPerView);

  const childArray = useMemo(() => React.Children.toArray(children), [children]);
  const totalItems = childArray.length;
  const maxIndex = Math.max(0, totalItems - visibleItems);

  useEffect(() => {
    if (!breakpoints || !containerRef.current) return;

    const updateItemsPerView = () => {
      const containerWidth = containerRef.current!.offsetWidth;

      const items = getItemsPerView(containerWidth, breakpoints);
      setVisibleItems(items);
      setCurrentIndex((prev) => Math.min(prev, totalItems - items));
    };

    const observer = new ResizeObserver(updateItemsPerView);
    observer.observe(containerRef.current);

    updateItemsPerView();

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [breakpoints, totalItems]);

  const scrollToIndex = useCallback((newIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const itemWidth = container.offsetWidth / visibleItems;

    container.scrollTo({
      left: itemWidth * newIndex,
      behavior: 'smooth',
    });

    setCurrentIndex((prev) => (prev !== newIndex ? newIndex : prev));
  }, [visibleItems]);

  const handlePrev = useCallback(() => {
    scrollToIndex(Math.max(0, currentIndex - 1));
  }, [currentIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    scrollToIndex(Math.min(maxIndex, currentIndex + 1));
  }, [currentIndex, maxIndex, scrollToIndex]);

  const itemStyle = useMemo(() => ({
    width: `${100 / visibleItems}%`,
    flex: `0 0 ${100 / visibleItems}%`,
  }), [visibleItems]);

  return (
    <div className={styles.carouselWrapper}>
      <Button
        onClick={handlePrev}
        theme="ghostIcon"
        className={styles.navButton}
        disabled={currentIndex === 0}
      >
        <ChevronLeft width={24} />
      </Button>

      <div className={styles.carouselContainer} ref={containerRef}>
        <div className={styles.carouselTrack}>
          {childArray.map((child, i) => (
            <div className={styles.carouselItem} style={itemStyle} key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleNext}
        theme="ghostIcon"
        className={styles.navButton}
        disabled={currentIndex === maxIndex}
      >
        <ChevronRight width={24} />
      </Button>
    </div>
  );
});
