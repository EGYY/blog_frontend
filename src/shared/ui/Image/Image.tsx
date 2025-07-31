import {
  ImgHTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Skeleton } from '../Skeleton/Skeleton';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Image.module.scss';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallbackSrc?: string
}

const DEFAULT_FALLBACK = `${__SERVER_URL__}/uploads/no-poster.jpg`;

export const Image = memo((props: ImageProps) => {
  const {
    className,
    src,
    alt,
    fallbackSrc = DEFAULT_FALLBACK,
    ...otherProps
  } = props;
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    setCurrentSrc(src);
  }, [src]);

  useLayoutEffect(() => {
    if (imgRef.current && imgRef.current.complete && !error) {
      setLoaded(true);
    }
  }, [currentSrc, error]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (!error) {
      setError(true);
      setLoaded(true);
      setCurrentSrc(fallbackSrc);
    }
  }, [error, fallbackSrc]);

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      {!loaded && (
        <Skeleton className={cls.skeleton} />
      )}
      <img
        {...otherProps}
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={classNames(cls.img, { [cls.hidden]: !loaded })}
      />
    </div>
  );
});
