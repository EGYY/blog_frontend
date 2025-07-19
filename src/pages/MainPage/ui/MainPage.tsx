/* eslint-disable react/button-has-type */
/* eslint-disable i18next/no-literal-string */
import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import styles from './MainPage.module.scss';
import X from '@/shared/assets/x.svg';
import PlayIcon from '@/shared/assets/play.svg';
import { Tag } from '@/shared/ui/Tag/Tag';
import { PageWrapper } from '@/widgets/PageWrapper/PageWrapper';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { toastActions } from '@/features/Toast';

const MainPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <PageWrapper>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.textContent}>
              <div className={styles.labelWrapper}>
                <Tag>Watch How It Works</Tag>
              </div>
              <div className={styles.headingWrapper}>
                <h2 className={styles.title}>See our platform in action</h2>
                <p className={styles.subtitle}>
                  Our short video walkthrough demonstrates how easy it is to get
                  started and shows the key features that make our solution stand
                  out.
                </p>
              </div>
              <ul className={styles.featureList}>
                {[
                  'Quick setup process',
                  'Intuitive user interface',
                  'Advanced features walkthrough',
                ].map((text) => (
                  <li key={text} className={styles.featureItem}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.checkIcon}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <Button onClick={() => {
                  dispatch(toastActions.addToast({ type: 'default', message: 'Успешный успех' }));
                }}
                >
                  Try It Free
                </Button>
                <Button to="/">
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className={styles.videoWrapper}>
              {isPlaying ? (
                <div className={styles.videoPlayer}>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className={styles.closeButton}
                    aria-label="Close video"
                  >
                    <X width={5} />
                  </button>
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Product Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.iframe}
                  />
                </div>
              ) : (
                <div
                  className={styles.videoThumbnail}
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    // eslint-disable-next-line max-len
                    src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Product walkthrough video thumbnail"
                    className={styles.thumbnailImage}
                  />
                  <div className={styles.playButtonWrapper}>
                    <div className={styles.playButton}>
                      <PlayIcon width={12} />
                    </div>
                  </div>
                  <div className={styles.overlay} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>

  );
};

export default MainPage;
