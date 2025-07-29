import {
  ImgHTMLAttributes,
  memo,
  useState,
  useRef,
  useCallback,
} from 'react';

import UploadIcon from '../../assets/upload.svg';

import { Image } from './Image';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Image.module.scss';

interface ImageUploadProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    onChangeImage?: (file: File) => void;
}

export const ImageUpload = memo((props: ImageUploadProps) => {
  const {
    src,
    className,
    alt,
    onChangeImage,
    ...otherProps
  } = props;
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChangeImage?.(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewSrc(previewUrl);
    }
  }, [onChangeImage]);

  return (
    <div
      className={classNames(styles.wrapper, {}, [className])}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        {...otherProps}
        src={previewSrc || src}
        alt={alt}
        className={styles.img}
      />
      {isHovering && (
        <div className={styles.cover}>
          <button
            type="button"
            className={styles.uploadButton}
            onClick={() => inputRef.current?.click()}
          >
            <UploadIcon width={24} />
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className={styles.fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
});
