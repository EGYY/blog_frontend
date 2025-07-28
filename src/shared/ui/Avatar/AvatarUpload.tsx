import {
  ImgHTMLAttributes,
  memo,
  useState,
  useRef,
  useCallback,
  SyntheticEvent,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './AvatarUpload.module.scss';
import UploadIcon from '../../assets/upload.svg';
import { AvatarSize } from './Avatar';

interface AvatarUploadProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  size?: AvatarSize;
  onChangeImage?: (file: File) => void;
}

export const AvatarUpload = memo((props: AvatarUploadProps) => {
  const {
    src,
    className,
    alt,
    size = 'md',
    onChangeImage,
    ...otherProps
  } = props;
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onErrorImage = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `${__SERVER_URL__}/uploads/no-user-image.png`;
  }, []);

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
      className={classNames(styles.avatarWrapper, {}, [className, size])}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        {...otherProps}
        src={previewSrc || src}
        alt={alt}
        className={styles.avatar}
        onError={onErrorImage}
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
