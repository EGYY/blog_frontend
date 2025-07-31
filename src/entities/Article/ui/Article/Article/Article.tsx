import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Article as ArticleType } from '../../../model/types/article';
import { ArticleError } from '../ArticleError/ArticleError';
import { ArticleLoading } from '../ArticleLoading/ArticleLoading';

import { ProfileMainInfo } from '@/entities/Profile';
import { getUser } from '@/entities/User';
import CalendarIcon from '@/shared/assets/calendar.svg';
import DownloadIcon from '@/shared/assets/download.svg';
import EyeIcon from '@/shared/assets/eye.svg';
import HeartIcon from '@/shared/assets/heart.svg';
import ShareIcon from '@/shared/assets/share.svg';
import PenIcon from '@/shared/assets/square-pen.svg';
import { getRouteArticleUpdate } from '@/shared/config/routes/routes';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toastActions } from '@/shared/lib/components/Toast';
import { formatDate } from '@/shared/lib/helpers/formatDate/formatDate';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useMobile } from '@/shared/lib/hooks/useMobile/useMobile';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button } from '@/shared/ui/Button/Button';
import { HoverCard } from '@/shared/ui/HoverCard/HoverCard';
import { Image } from '@/shared/ui/Image/Image';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './Article.module.scss';

interface ArticleProps {
  className?: string
  article: ArticleType | undefined
  loadingArticle?: boolean
  errorArticle?: string
}

export const Article: FC<ArticleProps> = memo(({
  className, article, loadingArticle, errorArticle,
}) => {
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const isMobile = useMobile();

  const isAuthUserArticle = useMemo(() => {
    if (article && user) {
      return article.author.id === user.id;
    }
    return false;
  }, [article, user]);

  const handleShare = async () => {
    const shareData = {
      title: article?.title,
      text: article?.subtitle,
      url: window.location.href,
    };

    if (navigator.share && isMobile) {
      try {
        await navigator.share(shareData);
        dispatch(toastActions.addToast({ message: 'Ссылка успешно отправлена', type: 'success' }));
      } catch (error) {
        dispatch(toastActions.addToast({ message: 'Ошибка при отправке', type: 'error' }));
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        dispatch(toastActions.addToast({ message: 'Ссылка успешно скопирована', type: 'success' }));
      } catch (error) {
        dispatch(toastActions.addToast({ message: 'Ошибка копирования', type: 'error' }));
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loadingArticle) {
    return <ArticleLoading />;
  }

  if (errorArticle) {
    return <ArticleError error={errorArticle} />;
  }

  return (
    <article className={classNames(cls.articleWrapper, {}, [className, 'printable-article'])}>
      <div className={cls.articleHeader}>
        <HoverCard
          trigger={(
            <Link to={`/profile/${article?.author.id}`} className={cls.articleAuthor}>
              <Avatar src={`${__SERVER_URL__}${article?.author.avatar}`} />
              <span>{article?.author.name || article?.author.email}</span>
            </Link>
      )}
          content={<ProfileMainInfo profile={article?.author} />}
          side="bottom"
        />
        <div className={classNames(cls.articleHeaderActions, {}, ['printable-actions'])}>
          <Button theme="outline" onClick={handlePrint}>
            <DownloadIcon width={15} />
            {t('download_pdf')}
          </Button>
          <Button theme="outline" onClick={handleShare}>
            <ShareIcon width={15} />
            {t('share')}
          </Button>
          {isAuthUserArticle && article?.id && (
            <Button theme="outline" to={getRouteArticleUpdate(article?.id)}>
              <PenIcon width={15} />
              {t('edit')}
            </Button>
          )}
        </div>
      </div>

      <div className={cls.articleContent}>
        <h1 className={cls.articleTitle}>{article?.title}</h1>
        <p className={cls.articleSubtitle}>{article?.subtitle}</p>
        <div className={cls.articleInfo}>
          <span>
            <CalendarIcon />
            {formatDate(article?.createdAt)}
          </span>
          <span>
            <EyeIcon />
            {article?.viewsCount}
          </span>
          <span>
            <HeartIcon />
            {article?.likesCount}
          </span>
        </div>
        <div className={cls.articleTags}>{article?.tags?.map((tag) => (<Tag key={tag.id}>{tag.name}</Tag>))}</div>
      </div>
      <div className={cls.artticlePoster}>
        <Image src={`${__SERVER_URL__}${article?.poster}`} alt={article?.title} />
      </div>
      <div className={classNames('separator', {}, [cls.separator])} />
      {
        // eslint-disable-next-line react/no-danger
        article?.content && <div className={cls.articleHtml} dangerouslySetInnerHTML={{ __html: article?.content }} />
      }
    </article>
  );
});
