import {
  ImgHTMLAttributes, memo, SyntheticEvent, useCallback,
} from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export const Image = memo((props: ImageProps) => {
  const { className, alt, ...otherProps } = props;

  const onErrorImage = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${__SERVER_URL__}/uploads/no-poster.jpg`;
  }, []);

  return (
    <img
      onError={onErrorImage}
      className={className}
      alt={alt}
      {...otherProps}
    />
  );
});
